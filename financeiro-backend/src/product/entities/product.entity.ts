import { Prisma } from "@prisma/client";
import { DecimalJsLike } from "@prisma/client/runtime/library";

export class Product implements Prisma.productUncheckedCreateInput{
    id?: number;
    client_id: number;
    name: string;
    recurrency?: number;
    subscription_customer?: Prisma.subscription_customerUncheckedCreateNestedManyWithoutProductInput;
    value: string | number | Prisma.Decimal | DecimalJsLike;
}
