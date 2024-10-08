import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CostCenterService } from './cost_center.service';
import { CreateCostCenterDto } from './dto/create-cost_center.dto';
import { UpdateCostCenterDto } from './dto/update-cost_center.dto';

@Controller('cost-center')
export class CostCenterController {
  constructor(private readonly costCenterService: CostCenterService) {}

  @Post()
  create(@Body() createCostCenterDto: CreateCostCenterDto) {
    return this.costCenterService.create(createCostCenterDto);
  }

  @Get("list/:id")
  findAll(@Param('id') client_id: string, @Query('page') page: string, @Query('search') search: string) {
    return this.costCenterService.findAll(client_id, page, search);
  }

  @Get("simple-list/:id")
  simpleList(@Param('id') client_id: string) {
    return this.costCenterService.simpleList(client_id);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.costCenterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCostCenterDto: UpdateCostCenterDto) {
    return this.costCenterService.update(+id, updateCostCenterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.costCenterService.remove(+id);
  }
}
