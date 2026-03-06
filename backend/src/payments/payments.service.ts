import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InvoicesService } from '../invoices/invoices.service';
import { InvoiceStatus } from '../invoices/entities/invoice.entity';
import * as crypto from 'crypto'
import axios from 'axios';

@Injectable()
export class PaymentsService {

    private razorpaykeysecret:string;

    constructor(
        private readonly configService: ConfigService,
        private readonly invoiceService : InvoicesService,
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

    //validate upa id
    async validateVpa(vpaid:string){
        const keyId = this.configService.get<string>('RAZORPAY_KEY_ID');
        if (!keyId) {
            throw new InternalServerErrorException('Razorpay key id is not configured.');
        }
        try {
            const response = await axios.post(`https://api.razorpay.com/v1/payments/validate/vpa`,
                { vpa: vpaid },
                {
                auth: {
                    username: keyId,
                    password: this.razorpaykeysecret,
                    },
                }
            )

            const data = response.data;


            if (!data.success) {
            return {
                valid: false,
                message: "VPA is invalid or does not exist.",
                };
            }

            return {
                    valid: true,
                    beneficiary: data.customer_name || "N/A",
            };
            
        } catch (error) {

            if (error.response && error.response.status === 400) {
                return {
                        valid: false,
                        message: "Invalid UPI Address",
                    };
            }
            throw new InternalServerErrorException('VPA validation service failed.');
        }
    }
}
