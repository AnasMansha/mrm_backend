import { Module } from '@nestjs/common';
import { SupabaseService } from 'src/utils/supabase/supabaseClient';
import { UploaderController } from './uploader.controller';
import { UploaderService } from './uploader.service';

@Module({
  controllers: [UploaderController],
  providers: [UploaderService, SupabaseService],
})
export class UploaderModule {}
