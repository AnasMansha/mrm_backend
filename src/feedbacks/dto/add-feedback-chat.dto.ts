import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class AddFeedbackChatDto {
  @ApiProperty({ enum: ['admin', 'user'] })
  @IsEnum(['admin', 'user'])
  role: 'admin' | 'user';

  @ApiProperty()
  @IsString()
  message: string;
}
