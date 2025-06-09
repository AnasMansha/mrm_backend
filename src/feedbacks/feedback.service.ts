import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { SupabaseService } from 'src/utils/supabase/supabaseClient';
import { AddFeedbackChatDto } from './dto/add-feedback-chat.dto';

@Injectable()
export class FeedbacksService {
  private readonly supabase;

  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();
  }
  async create(dto: CreateFeedbackDto) {
    const { order_id, user_id } = dto;

    const { data: order, error: orderError } = await this.supabase
      .from('orders')
      .select('id, user_id')
      .eq('id', order_id)
      .single();

    if (orderError || !order) {
      throw new NotFoundException('Order not found');
    }

    if (order.user_id !== user_id) {
      throw new BadRequestException('User does not own this order');
    }

    const feedbackData = {
      rating: dto.rating,
      user_id: dto.user_id,
      feedback: dto.feedback,
      attached_image_urls: dto.attached_image_urls || [],
      feedback_chat: [],
      order_id: dto.order_id,
    };

    const { data, error } = await this.supabase
      .from('feedbacks')
      .insert(feedbackData)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async addChat(feedbackId: string, dto: AddFeedbackChatDto) {
    const { data: feedback, error: fetchError } = await this.supabase
      .from('feedbacks')
      .select('feedback_chat')
      .eq('id', feedbackId)
      .single();

    if (fetchError || !feedback) {
      throw new NotFoundException('Feedback not found');
    }

    const updatedChat = [...(feedback.feedback_chat || []), dto];

    const { data, error } = await this.supabase
      .from('feedbacks')
      .update({ feedback_chat: updatedChat })
      .eq('id', feedbackId)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async delete(ids: string[]) {
    const filteredIds = ids
      .filter((id) => typeof id === 'string' && id.trim() !== '')
      .map((id) => id.trim());

    const { data, error } = await this.supabase
      .from('feedbacks')
      .delete()
      .in('id', filteredIds)
      .select();
    console.log(data);

    if (error) throw error;

    return { deleted: data?.length ?? 0 };
  }

  async getByUser(userId: string) {
    const { data, error } = await this.supabase
      .from('feedbacks')
      .select('*')
      .eq('user_id', userId);

    console.log(data);
    if (error) throw error;

    return data;
  }

  async getAll() {
    const { data, error } = await this.supabase.from('feedbacks').select('*');

    if (error) throw error;

    return data;
  }
}
