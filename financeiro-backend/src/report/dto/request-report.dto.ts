import { Dayjs } from "dayjs";

export class RequestDto {
    initial_date: string;
    final_date: string;
    date_type: string;
    category: string;
    type: string;
    client: number;
}