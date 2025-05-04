import { Module } from '@nestjs/common';
import { SupabaseService } from 'src/utils/supabase/supabaseClient';
import { DealsController } from './deal.controller';
import { DealsService } from './deal.service';

@Module({
  controllers: [DealsController],
  providers: [DealsService, SupabaseService],
})
export class DealsModule {}
