import { Controller,Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentsService } from './payments.service';
import { Public } from 'src/auth/public.decorators';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly configService: ConfigService) {}

  @Public()
  @Get('Razorpay-key')
  getRazorpayKey(){
    return {'key' : this.configService.get<string>('RAZORPAY_KEY_ID')}
  }
}
