import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { response } from 'express';

@Injectable()
export class BankAccountService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBankAccountDto: CreateBankAccountDto) {
    try {
      if (createBankAccountDto.default) {
        const existingDefault = await this.prisma.bank_account.findFirst({
          where: { client_id: createBankAccountDto.client_id, default: true },
        });

        if (existingDefault) {
          throw new Error('Já existe uma conta padrão para este cliente');
        }
      }

      return await this.prisma.bank_account.create({
        data: createBankAccountDto,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new Error(error.message);
    }
  }

  async findAll(id: string) {
    try {
      return await this.prisma.bank_account.findMany({
        where: { client_id: parseInt(id) },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async simpleList(client_id: string) {
    try {
      return await this.prisma.bank_account.findMany({
        where: { client_id: parseInt(client_id) },
        select: {
          id: true,
          name: true,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const account = await this.prisma.bank_account.findFirst({
        where: { id: parseInt(id) },
      });

      if (!account) {
        throw new Error('Nenhuma conta encontrada.');
      }

      return account;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new Error(error.message);
    }
  }

  async update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    try {
      if (updateBankAccountDto.default) {
        const existingDefault = await this.prisma.bank_account.findFirst({
          where: {
            client_id: updateBankAccountDto.client_id,
            default: true,
            id: { not: id },
          },
        });

        if (existingDefault) {
          throw new Error('Já existe uma conta padrão para este cliente');
        }
      }

      return await this.prisma.bank_account.update({
        where: { id },
        data: updateBankAccountDto,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.bank_account.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
