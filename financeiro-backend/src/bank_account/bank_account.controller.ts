import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Put,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { BankAccountService } from './bank_account.service';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { response } from 'express';

@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  async create(@Body() createBankAccountDto: CreateBankAccountDto) {
    try {
      return await this.bankAccountService.create(createBankAccountDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: error.message,
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const account = await this.bankAccountService.findOne(id);
      if (!account) {
        throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
      }
      return account;
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error', 
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('list/:id')
  async findAll(@Param('id') id: string) {
    try {
      return await this.bankAccountService.findAll(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('simple-list/:id')
  async simpleList(@Param('id') client_id: string) {
    try {
      return await this.bankAccountService.simpleList(client_id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBankAccountDto: UpdateBankAccountDto) {
    try {
      return await this.bankAccountService.update(+id, updateBankAccountDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.bankAccountService.remove(+id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
