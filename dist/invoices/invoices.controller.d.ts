import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    create(createInvoiceDto: CreateInvoiceDto, req: any): Promise<import("./entities/invoice.entity").Invoice>;
    createPaymentOrder(id: string): Promise<import("razorpay/dist/types/orders").Orders.RazorpayOrder>;
    findAll(): Promise<import("./entities/invoice.entity").Invoice[]>;
    findOne(id: string): Promise<import("./entities/invoice.entity").Invoice | null>;
    update(id: string, updateInvoiceDto: UpdateInvoiceDto): string;
    remove(id: string): string;
}
