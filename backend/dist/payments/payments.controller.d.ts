import { ConfigService } from '@nestjs/config';
import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly configService;
    private readonly paymentService;
    constructor(configService: ConfigService, paymentService: PaymentsService);
    getRazorpayKey(): {
        key: string | undefined;
    };
    verifyPayment(Body: any): Promise<import("../invoices/entities/invoice.entity").Invoice>;
}
