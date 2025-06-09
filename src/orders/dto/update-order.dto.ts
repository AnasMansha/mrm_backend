import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'Order details (any structure allowed)',
    type: Object,
  })
  details: any;
}
