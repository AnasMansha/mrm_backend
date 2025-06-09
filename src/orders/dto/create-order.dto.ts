import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({ enum: ['deal', 'menu_item'] })
  @IsString()
  item_type: 'deal' | 'menu_item';

  @ApiProperty()
  @IsNotEmpty()
  amount: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  special_instructions: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  menu_item_id?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  deal_id?: string;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    description: 'Order details (any structure allowed)',
    type: Object,
  })
  details: any;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
