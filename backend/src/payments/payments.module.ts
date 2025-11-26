import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { InvoicesModule } from '../invoices/invoices.module';
import Razorpay from 'razorpay';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [InvoicesModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
