import { Module } from '@nestjs/common';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { CategoriesModule } from './categories/categories.module';
import { SupabaseService } from './utils/supabase/supabaseClient';
import { SupabaseAuthGuard } from './utils/guards/supabase-auth.guard';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    MenuItemsModule,
    CategoriesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
  ],
  providers: [SupabaseService, SupabaseAuthGuard],
  exports: [SupabaseService, SupabaseAuthGuard],
})
export class AppModule {}
