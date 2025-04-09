import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './interfaces/category.interface';
import { CategoryService } from './categories.service';

@ApiTags('Menu Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  getAll(): Promise<Category[]> {
    return this.service.getAll();
  }

  @Post()
  create(@Body() dto: CreateCategoryDto): Promise<void> {
    return this.service.create(dto);
  }

  @Delete(':name')
  delete(@Param('name') name: string): Promise<void> {
    return this.service.deleteByName(name);
  }
}
