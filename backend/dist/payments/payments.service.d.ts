import { ConfigService } from '@nestjs/config';
import { InvoicesService } from '../invoices/invoices.service';
export declare class PaymentsService {
    private readonly configService;
    private readonly invoiceService;
    private razorpaykeysecret;
    constructor(configService: ConfigService, invoiceService: InvoicesService);
    verifyPayment(body: any): Promise<import("../invoices/entities/invoice.entity").Invoice>;
}
