import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Client } from 'src/clients/entities/client.entity';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
export declare class InvoicesService {
    private readonly clientRepository;
    private readonly invoiceRepository;
    private readonly userRepository;
    private configService;
    private razorpay;
    constructor(clientRepository: Repository<Client>, invoiceRepository: Repository<Invoice>, userRepository: Repository<User>, configService: ConfigService);
    create(createInvoiceDto: CreateInvoiceDto, userPayload: any): Promise<Invoice>;
    createPaymentOrder(invoiceId: string): Promise<import("razorpay/dist/types/orders").Orders.RazorpayOrder>;
    findAll(): Promise<Invoice[]>;
    findOne(id: string): Promise<Invoice | null>;
    update(id: number, updateInvoiceDto: UpdateInvoiceDto): string;
    remove(id: number): string;
}
