import { Controller,Get,Body,Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentsService } from './payments.service';
import { Public } from '../auth/public.decorators';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly configService: ConfigService,
    private readonly paymentService : PaymentsService
  ) {}

  @Public()
  @Get('Razorpay-key')
  getRazorpayKey(){
    return {'key' : this.configService.get<string>('RAZORPAY_KEY_ID')}
  }
  @Public()
  @Post('verify-payment')
  verifyPayment(@Body() Body:any){
    return this.paymentService.verifyPayment(Body);
  }

}
