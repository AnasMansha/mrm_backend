import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploaderService } from './uploader.service';

@Controller('uploader')
@ApiTags('Uploader')
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload an image file to Supabase' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.uploaderService.uploadImage(file);
  }
}
