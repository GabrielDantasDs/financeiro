import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prisma:PrismaService){}

  create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.prisma.subscription_customer.create({ data:createSubscriptionDto });
  }

  findAll() {

  }

  findOne(id: number) {
    return this.prisma.subscription_customer.findFirst({ where: { id:id }});
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.prisma.subscription_customer.update({ where: { id:id }, data: updateSubscriptionDto });
  }

  remove(id: number) {
    return this.prisma.subscription_customer.delete({ where: { id: id }})
  }
}
