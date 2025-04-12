import { Module } from '@nestjs/common';
import { SupabaseModule } from 'src/utils/supabase/supabase.module';
import { MenuItemsController } from './menu-items.controller';
import { MenuItemsService } from './menu-items.service';

@Module({
  imports: [SupabaseModule],
  controllers: [MenuItemsController],
  providers: [MenuItemsService],
})
export class MenuItemsModule {}
