import { Module } from '@nestjs/common';
import { SupabaseService } from './supabaseClient';

@Module({
  imports: [],
  controllers: [],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
