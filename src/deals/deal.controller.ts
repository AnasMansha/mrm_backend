import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { DealsService } from './deal.service';

@Controller('deals')
@ApiTags('Deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new deal with deal items' })
  create(@Body() createDealDto: CreateDealDto) {
    return this.dealsService.create(createDealDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all deals' })
  findAll() {
    return this.dealsService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a deal by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  delete(@Param('id') id: string) {
    return this.dealsService.delete(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a deal by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  update(@Param('id') id: string, @Body() updateDealDto: UpdateDealDto) {
    return this.dealsService.update(id, updateDealDto);
  }
}
