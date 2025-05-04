import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from 'src/utils/supabase/supabaseClient';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { Deal } from './interfaces/deal.interface';

@Injectable()
export class DealsService {
  private readonly supabase;
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();
  }

  async create(createDealDto: CreateDealDto) {
    const {
      name,
      deal_for = ['Delivery'],
      deal_scope = ['all'],
      is_active = true,
      amount,
      deal_start,
      deal_end,
      dealItems,
    } = createDealDto;

    if (amount < 0) {
      throw new BadRequestException('Amount must be non-negative');
    }

    if (!dealItems || dealItems.length === 0) {
      throw new BadRequestException('Deal items cannot be empty');
    }

    const menuItemIds = dealItems.map((item) => item.menu_item_id);

    const { data: menuItems, error: menuItemError } = await this.supabase
      .from('menu_items')
      .select('id')
      .in('id', menuItemIds);

    if (menuItemError) {
      console.log('Error fetching menu items:', menuItemError);
      throw new BadRequestException('Error fetching menu items');
    }

    if (menuItems.length !== menuItemIds.length) {
      throw new BadRequestException('Duplicate or invalid menu items provided');
    }

    const newDeal: Deal = {
      name,
      deal_for,
      deal_start,
      deal_end,
      deal_scope,
      is_active,
      amount,
    };

    const { data: dealData, error: dealError } = await this.supabase
      .from('deals')
      .insert(newDeal)
      .select('id')
      .single();

    if (dealError) {
      throw new BadRequestException('Error creating deal');
    }

    const dealItemsToInsert = dealItems.map((item) => ({
      deal_id: dealData.id,
      menu_item_id: item.menu_item_id,
      amount: item.amount,
    }));

    const { error: dealItemsError } = await this.supabase
      .from('deal_items')
      .insert(dealItemsToInsert);

    if (dealItemsError) {
      throw new BadRequestException('Error inserting deal items');
    }

    return dealData;
  }

  async findAll(): Promise<Deal[]> {
    const { data: deals, error: dealError } = await this.supabase.from('deals')
      .select(`
        *,
        deal_items (
          *,
          menu_items (
            id,
            name,
            description,
            price
          )
        )
      `);

    if (dealError) {
      throw new Error('Error fetching deals');
    }

    return deals.map((deal) => ({
      ...deal,
      deal_items: deal.deal_items.map((item) => ({
        ...item,
        menu_item: item.menu_items,
        menu_items: undefined,
      })),
    }));
  }

  async delete(id: string): Promise<void> {
    const { data } = await this.supabase
      .from('deals')
      .select()
      .eq('id', id)
      .single();
    if (!data) {
      throw new NotFoundException('Deal not found');
    }

    await this.supabase.from('deals').delete().eq('id', id);
  }

  async update(id: string, updateDealDto: UpdateDealDto): Promise<void> {
    const { data } = await this.supabase
      .from('deals')
      .select()
      .eq('id', id)
      .single();
    if (!data) {
      throw new NotFoundException('Deal not found');
    }

    if (updateDealDto.amount && updateDealDto.amount < 0) {
      throw new BadRequestException('Amount must be non-negative');
    }

    await this.supabase.from('deals').update(updateDealDto).eq('id', id);
  }
}
