import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { SupabaseService } from './utils/supabase/supabaseClient';
import { SupabaseAuthGuard } from './utils/guards/supabase-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { UploaderModule } from './uploader/uploader.module';
import { DealsModule } from './deals/deal.module';
import { OrdersModule } from './orders/orders.module';
import { FeedbacksModule } from './feedbacks/feedback.module';
@Module({
  imports: [
    CategoriesModule,
    MenuItemsModule,
    UploaderModule,
    DealsModule,
    OrdersModule,
    FeedbacksModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
  ],
  providers: [SupabaseService, SupabaseAuthGuard],
  exports: [SupabaseService, SupabaseAuthGuard],
})
export class AppModule {}
