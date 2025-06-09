import { Module } from '@nestjs/common';
import { SupabaseModule } from 'src/utils/supabase/supabase.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [SupabaseModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
