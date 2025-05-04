import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDealDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    isArray: true,
    enum: ['Dinein', 'Takeaway', 'Delivery'],
    required: false,
  })
  @IsArray()
  @IsOptional()
  deal_for?: string[];

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  deal_start: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  deal_end: Date;

  @ApiProperty({ isArray: true, required: false })
  @IsArray()
  @IsOptional()
  deal_scope?: string[];

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ type: [Object] })
  @IsArray()
  dealItems: { menu_item_id: string; amount: number }[];
}
