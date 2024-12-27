import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { FinancialTransactionService } from './financial_transaction.service';
import { CreateFinancialTransactionDto } from './dto/create-financial_transaction.dto';
import { UpdateFinancialTransactionDto } from './dto/update-financial_transaction.dto';

@Controller('financial-transaction')
export class FinancialTransactionController {
  constructor(
    private readonly financialTransactionService: FinancialTransactionService,
  ) {}

  @Post()
  create(@Body() createFinancialTransactionDto: CreateFinancialTransactionDto) {
    return this.financialTransactionService.create(
      createFinancialTransactionDto,
    );
  }

  @Get('list/:id')
  findAll() {
    return this.financialTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financialTransactionService.findOne(+id);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateFinancialTransactionDto: UpdateFinancialTransactionDto,
  ) {
    return this.financialTransactionService.update(
      +id,
      updateFinancialTransactionDto,
    );
  }

  @Put('marked-paid/:id')
  markedPaid(
    @Param('id') id: string,
    @Body() updateFinancialTransactionDto: UpdateFinancialTransactionDto,
  ) {
    return this.financialTransactionService.markedPaid(
      +id,
      updateFinancialTransactionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financialTransactionService.remove(+id);
  }
}
