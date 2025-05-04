import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { SupabaseService } from './utils/supabase/supabaseClient';
import { SupabaseAuthGuard } from './utils/guards/supabase-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { UploaderModule } from './uploader/uploader.module';
import { DealsModule } from './deals/deal.module';
@Module({
  imports: [
    CategoriesModule,
    MenuItemsModule,
    UploaderModule,
    DealsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
  ],
  providers: [SupabaseService, SupabaseAuthGuard],
  exports: [SupabaseService, SupabaseAuthGuard],
})
export class AppModule {}
