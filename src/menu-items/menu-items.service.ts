import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from 'src/utils/supabase/supabaseClient';

@Injectable()
export class MenuItemsService {
  private readonly supabase;
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();
  }

  async getAll(): Promise<MenuItem[]> {
    const { data } = await this.supabase.from('menu_items').select();
    return data;
  }

  async getAllAvailable(): Promise<MenuItem[]> {
    const { data } = await this.supabase
      .from('menu_items')
      .where('is_available', 'eq', true)
      .select();

    return data;
  }

  async create(menuItem: MenuItem): Promise<void> {
    const { data } = await this.supabase
      .from('menu_items')
      .select()
      .eq('name', menuItem.name);

    if (data.length) {
      throw new NotFoundException(
        `Menu item with name: ${menuItem.name} already exists`,
      );
    }

    await this.supabase.from('menu_items').insert(menuItem);
  }

  async update(id: string, menuItem: MenuItem): Promise<void> {
    await this.supabase.from('menu_items').update(menuItem).eq('id', id);
  }

  async delete(id: string): Promise<void> {
    await this.supabase.from('menu_items').delete().eq('id', id);
  }
}
