import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './interfaces/category.interface';
import { SupabaseService } from 'src/utils/supabase/supabaseClient';

@Injectable()
export class CategoryService {
  private readonly supabase;
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();
  }

  async getAll(): Promise<Category[]> {
    const { data } = await this.supabase.from('menu_categories').select();
    return data;
  }

  async create(category: Category): Promise<void> {
    const { data } = await this.supabase
      .from('menu_categories')
      .select()
      .eq('name', category.name);

    if (data.length) {
      throw new NotFoundException(
        `Category with name: ${category.name} already exists`,
      );
    }

    await this.supabase.from('menu_categories').insert(category);
  }

  async deleteByName(name: string): Promise<void> {
    await this.supabase.from('menu_categories').delete().eq('name', name);
  }
}
