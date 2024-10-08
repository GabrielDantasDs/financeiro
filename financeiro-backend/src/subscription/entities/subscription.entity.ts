import { Prisma } from "@prisma/client";

export class Subscription implements Prisma.subscription_customerUncheckedCreateInput {
    customer_id: number;
    financial_transaction?: Prisma.financial_transactionUncheckedCreateNestedManyWithoutSubscriptionInput;
    id?: number;
    product_id: number;
    recurrence_time_in_days: number;
}
