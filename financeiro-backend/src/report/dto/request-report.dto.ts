import { Dayjs } from "dayjs";

export class RequestDto {
    initialDate: Dayjs;
    finalDate: Dayjs;
    dateType: string;
    type: string;
    client: number;
}