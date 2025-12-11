import { IsNumber, IsNumberString } from "class-validator";
import { Subscription } from "../entities/subscription.entity";


export class CreateSubscriptionDto extends Subscription {
    @IsNumberString()
    customer_id: number;

    @IsNumberString()
    product_id: number;

    @IsNumber()
    recurrence_time_in_days: number;
}
