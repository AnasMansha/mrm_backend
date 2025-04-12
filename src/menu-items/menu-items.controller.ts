import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MenuItemsService } from './menu-items.service';
@ApiTags('Menu Items')
@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly service: MenuItemsService) {}

  @Get()
  getAll(): Promise<MenuItem[]> {
    return this.service.getAll();
  }

  @Get('available')
  getAllAvailable(): Promise<MenuItem[]> {
    return this.service.getAllAvailable();
  }

  @Post()
  create(@Body() dto): Promise<void> {
    return this.service.create(dto);
  }

  @Post()
  update(@Param('id') id: string, @Body() dto): Promise<void> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
