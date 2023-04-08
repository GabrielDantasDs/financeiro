import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FinancialTransactionService } from './financial_transaction.service';
import { CreateFinancialTransactionDto } from './dto/create-financial_transaction.dto';
import { UpdateFinancialTransactionDto } from './dto/update-financial_transaction.dto';
import { ClienteService } from 'src/cliente/cliente.service';

@Controller('financial')
export class FinancialTransactionController {
  constructor(
    private readonly financialTransactionService: FinancialTransactionService,
    private readonly customerService: ClienteService,
  ) {}

  @Post()
  async create(@Body() data: any) {
    let data_formatted: CreateFinancialTransactionDto = {
      ...data,
      fin_value: Number(data.fin_value.toString().replace(/[^0-9\.-]+/g,"")) / 100,
      fin_customer: {
        connect: {
          id: parseInt(data.fin_customer),
        },
      },
      fin_category: {
        connect: {
          id: data.fin_category,
        },
      },
    };

    return this.financialTransactionService.create(data_formatted);
  }

  @Get('/charts/:id')
  async getChartsData(customer_id: number) {
    return this.financialTransactionService.getChartsData(customer_id);
  }

  @Get(':id')
  findAllByCustomer(id: number) {
    return this.financialTransactionService.findAllByCustomer(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    let data_formatted: UpdateFinancialTransactionDto = {
      ...data,
      fin_customer: {
        connect: {
          id: data.fin_customer,
        },
      },
    };
    return this.financialTransactionService.update(+id, data_formatted);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financialTransactionService.remove(+id);
  }
}
