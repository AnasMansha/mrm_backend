import { Module } from '@nestjs/common';
import { FeedbacksController } from './feedback.controller';
import { FeedbacksService } from './feedback.service';
import { SupabaseModule } from 'src/utils/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
})
export class FeedbacksModule {}
