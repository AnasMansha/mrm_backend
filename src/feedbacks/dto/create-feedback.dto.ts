import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsString()
  feedback: string;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsOptional()
  attached_image_urls?: string[];

  @ApiProperty()
  @IsUUID()
  order_id: string;
}
