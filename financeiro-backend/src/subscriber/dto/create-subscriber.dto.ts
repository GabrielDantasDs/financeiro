import { Prisma } from '@prisma/client';
import { Subscriber } from '../entities/subscriber.entity';
import { IsString } from 'class-validator';

export class CreateSubscriberDto implements Subscriber {
  sub_type: string;
  sub_name: string;
  sub_document: string;
  sub_phone: string;
  sub_address: string;
  sub_district: string;
  sub_number: string;
  sub_state: string;
  sub_city: string;
  sub_zip_code: string;
  created_at?: string | Date;
  sub_client: Prisma.clientCreateNestedOneWithoutSubscriberInput;
  financial_transaction?: Prisma.financial_transactionCreateNestedManyWithoutSubscriberInput;
}
