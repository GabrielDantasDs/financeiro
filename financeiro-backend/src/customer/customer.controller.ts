import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';

import { RequestCustomerDto } from './dto/request-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() requestCustomerDto: RequestCustomerDto) {
    return this.customerService.create(requestCustomerDto);
  }

  @Get('list/:id')
  findAll(@Param('id') client_id: string, @Query('page') page: string, @Query('search') search: string) {
    return this.customerService.findAll(client_id, page, search);
  }

  @Get('simple-list/:id')
  simpleList(@Param('id') client_id: string) {
    return this.customerService.simpleList(client_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() requestCustomerDto: RequestCustomerDto) {
    return this.customerService.update(+id, requestCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
