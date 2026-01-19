  import { Prisma } from '@prisma/client';

  export class Customer implements Prisma.customerUncheckedCreateInput {
    address?: string;
    city?: string;
    client_id: number;
    created_at?: string | Date;
    neighborhood?: string;
    document?: string;
    financial_transaction?: Prisma.financial_transactionUncheckedCreateNestedManyWithoutCustomerInput;
    id?: number;
    name: string;
    number?: string;
    phone: string;
    state?: string;
    subscription_customer?: Prisma.subscription_customerUncheckedCreateNestedManyWithoutCustomerInput;
    client?: Prisma.customerUncheckedCreateNestedManyWithoutClientInput
    zip_code?: string;
    email: string;
  }
