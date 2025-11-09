import {IsString,IsNumber,IsDate} from 'class-validator'
export class CreateInvoiceDto {
    @IsString()
    client_id:string
    @IsNumber()
    amount:number
    @IsDate()
    due_date:Date
}
