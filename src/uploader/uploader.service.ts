import { BadRequestException, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/utils/supabase/supabaseClient';

@Injectable()
export class UploaderService {
  private readonly supabase;
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = supabaseService.getClient();
  }

  async uploadImage(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file provided');

    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/jpg',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Only image files are allowed (jpeg, png, webp, jpg)',
      );
    }

    return this.supabaseService.uploadImage(file, 'test_user_id');
  }
}
