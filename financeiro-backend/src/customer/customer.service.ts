import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestCustomerDto } from './dto/request-customer.dto';
import { Prisma } from '@prisma/client';
import { CreateSubscriptionDto } from 'src/subscription/dto/create-subscription.dto';
import { ResponseCustomerDto } from './dto/response-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}
  create(requestCustomerDto: RequestCustomerDto) {
    const { product_id, ...createCustomerDto } = requestCustomerDto;

    if (product_id) {
      const createSubscriptionCustomerDto: CreateSubscriptionDto = {
        customer_id: requestCustomerDto.client_id,
        product_id: product_id,
        recurrence_time_in_days: 30,
      };

      const subscription_customer = this.prisma.subscription_customer.create({ data: createSubscriptionCustomerDto });
    }

    return this.prisma.customer.create({ data: createCustomerDto as Prisma.customerUncheckedCreateInput });
  }

  findAll(client_id: string, page: string, query: string) {
    const _page = parseInt(page) ?? 0;
    const _query = query ?? '';
    const skip = _page * 10;
    const take = 10;

    return this.prisma.customer.findMany({
      skip,
      take,
      where: {
        client_id: {
          equals: parseInt(client_id),
        },
        name: {
          startsWith: _query,
        },
      },
    });
  }

  simpleList(client_id: string) {
    return this.prisma.customer.findMany({
      where: {
        client_id: {
          equals: parseInt(client_id),
        },
      },
    });
  }

  async findOne(id: number) {
    let data: ResponseCustomerDto;

    const customer = await this.prisma.customer.findFirst({
      where: { id: id },
      include: {
        subscription_customer: true,
      },
    });

    data = {
      client_id: customer.client_id,
      email: customer.email,
      name: customer.name,
      neighborhood: customer.neighborhood,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      document: customer.document,
      number: customer.number,
      product_id: customer?.subscription_customer ? customer.subscription_customer[0].product_id : null,
      state: customer.state,
      zip_code: customer.zip_code
    };

    return data;
  }

  update(id: number, requestCustomerDto: RequestCustomerDto) {
    const { product_id, ...updateCustomerDto } = requestCustomerDto;

    if (product_id) {
      const createSubscriptionCustomerDto: CreateSubscriptionDto = {
        customer_id: requestCustomerDto.client_id,
        product_id: product_id,
        recurrence_time_in_days: 30,
      };

      const subscription_customer = this.prisma.subscription_customer.create({ data: createSubscriptionCustomerDto });
    }

    return this.prisma.customer.update({ where: { id: id }, data: updateCustomerDto as any });
  }

  remove(id: number) {
    return this.prisma.customer.delete({ where: { id: id } });
  }
}
