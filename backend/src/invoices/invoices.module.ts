import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Invoice,User,Client])],
  controllers: [InvoicesController],
  providers: [InvoicesService],
  exports:[InvoicesService]
})
export class InvoicesModule {}
