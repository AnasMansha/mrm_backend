import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create an order' })
  @ApiBody({
    type: CreateOrderDto,
    description: 'DTO for creating an order, including nested items',
  })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Order ID' })
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({ status: 200, description: 'Order updated successfully' })
  update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.ordersService.update(id, dto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete orders by comma-separated IDs' })
  @ApiQuery({
    name: 'ids',
    type: String,
    description: 'Comma-separated order IDs (e.g. 1,2,3)',
  })
  @ApiResponse({ status: 200, description: 'Orders deleted successfully' })
  delete(@Query('ids') ids: string) {
    return this.ordersService.delete(ids.split(','));
  }

  @Get('user/:user_id')
  @ApiOperation({ summary: 'Get all orders by user ID' })
  @ApiParam({ name: 'user_id', type: String, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Orders fetched successfully' })
  getByUser(@Param('user_id') userId: string) {
    return this.ordersService.getByUser(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'All orders fetched successfully' })
  getAll() {
    return this.ordersService.getAll();
  }
}
