import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { createClient } from '@supabase/supabase-js';
import { SupabaseService } from 'src/utils/supabase/supabaseClient';

@Injectable()
export class OrdersService {
  private readonly supabase;

  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();
  }

  async create(dto: CreateOrderDto) {
    const { user_id, details, items } = dto;
    if (!items.length) throw new BadRequestException('No items provided');

    const dealIds = items
      .filter((i) => i.item_type === 'deal')
      .map((i) => i.deal_id);
    const menuItemIds = items
      .filter((i) => i.item_type === 'menu_item')
      .map((i) => i.menu_item_id);

    const [deals, menuItems] = await Promise.all([
      dealIds.length
        ? this.supabase.from('deals').select('*').in('id', dealIds)
        : { data: [], error: null },
      menuItemIds.length
        ? this.supabase.from('menu_items').select('*').in('id', menuItemIds)
        : { data: [], error: null },
    ]);

    if (deals.error || menuItems.error)
      throw new BadRequestException('Item fetch failed');

    if (
      deals.data.length !== dealIds.length ||
      menuItems.data.length !== menuItemIds.length
    )
      throw new BadRequestException('Invalid deal or menu item IDs');

    const totalAmount = items.reduce((sum, i) => sum + Number(i.amount), 0);
    const totalItems = items.length;

    const { data: order, error: orderErr } = await this.supabase
      .from('orders')
      .insert({
        user_id,
        details,
        status: 'pending',
        total_amount: totalAmount.toString(),
        total_items: totalItems.toString(),
      })
      .select()
      .single();

    if (orderErr) throw new BadRequestException('Order creation failed');

    const orderItems = items.map((i) => ({
      order_id: order.id,
      item_type: i.item_type,
      amount: i.amount,
      special_instructions: i.special_instructions,
      ...(i.menu_item_id && { menu_item_id: i.menu_item_id }),
      ...(i.deal_id && { deal_id: i.deal_id }),
    }));

    const { error: itemErr } = await this.supabase
      .from('order_items')
      .insert(orderItems);
    if (itemErr) {
      console.error(itemErr);
      throw new BadRequestException('Order items creation failed');
    }

    return order;
  }

  async update(id: string, dto: UpdateOrderDto) {
    const { data: order, error } = await this.supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !order) throw new NotFoundException('Order not found');
    if (order.status !== 'pending')
      throw new BadRequestException('Only pending orders can be updated');

    const { error: updateErr } = await this.supabase
      .from('orders')
      .update({ details: dto.details })
      .eq('id', id);
    if (updateErr) throw new BadRequestException('Update failed');
    return { message: 'Order updated' };
  }

  async delete(ids: string[]) {
    if (!ids.length) throw new BadRequestException('No IDs provided');
    const { error } = await this.supabase.from('orders').delete().in('id', ids);
    if (error) throw new BadRequestException('Delete failed');
    return { message: 'Deleted successfully' };
  }

  async getByUser(userId: string) {
    const { data, error } = await this.supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId);
    if (error) throw new BadRequestException('Fetch failed');
    return data;
  }

  async getAll() {
    const { data, error } = await this.supabase.from('orders').select('*');
    if (error) throw new BadRequestException('Fetch failed');
    return data;
  }
}
