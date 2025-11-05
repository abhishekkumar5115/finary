import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    create(createInvoiceDto: CreateInvoiceDto, req: any): Promise<import("./entities/invoice.entity").Invoice>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateInvoiceDto: UpdateInvoiceDto): string;
    remove(id: string): string;
}
