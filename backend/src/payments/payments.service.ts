import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InvoicesService } from '../invoices/invoices.service';
import { InvoiceStatus } from '../invoices/entities/invoice.entity';
import * as crypto from 'crypto'


@Injectable()
export class PaymentsService {

    private razorpaykeysecret:string;

    constructor(
        private readonly configService: ConfigService,
        private readonly invoiceService : InvoicesService
    ){
        const secretKey = this.configService.get<string>('RAZORPAY_KEY_SECRET');
        if (!secretKey) {
            throw new Error('RAZORPAY_KEY_SECRET is not defined in the configuration');
        }
        this.razorpaykeysecret = secretKey;
    }

    async verifyPayment(body:any){
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            invoiceId
        } = body;

        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expetedSign = crypto
        .createHmac('sha256', this.razorpaykeysecret)
        .update(sign.toString())
        .digest('hex')

        if(expetedSign !== razorpay_signature){
            throw new BadRequestException("Invalid payment signature");
        }
        return this.invoiceService.updateInvoiceStatus(invoiceId, InvoiceStatus.Paid);
    }
}
