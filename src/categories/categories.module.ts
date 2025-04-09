import { Module } from '@nestjs/common';
import { CategoryController } from './categories.controller';
import { CategoryService } from './categories.service';
import { SupabaseModule } from 'src/utils/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoriesModule {}
