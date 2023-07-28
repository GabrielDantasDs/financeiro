import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
  Put,
} from '@nestjs/common';
import { BankAccountService } from './bank_account.service';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';

@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @HttpCode(200)
  @Post('/account/:id')
  findOne(@Param('id') id: string, @Body() data: Object) {
    return this.bankAccountService.findOne(+id, data);
  }

  @Post()
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountService.create(createBankAccountDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.bankAccountService.findAll(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.bankAccountService.update(+id, updateBankAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankAccountService.remove(+id);
  }

  // @Post('testPost')
  // async testPost(@Req() request:any) {
  //   console.log(request.user)
  // }
}
