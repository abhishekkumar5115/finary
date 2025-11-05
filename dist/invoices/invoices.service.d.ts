import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Client } from 'src/clients/entities/client.entity';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { User } from 'src/users/entities/user.entity';
export declare class InvoicesService {
    private readonly clientRepository;
    private readonly invoiceRepository;
    private readonly userRepository;
    constructor(clientRepository: Repository<Client>, invoiceRepository: Repository<Invoice>, userRepository: Repository<User>);
    create(createInvoiceDto: CreateInvoiceDto, userPayload: any): Promise<Invoice>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateInvoiceDto: UpdateInvoiceDto): string;
    remove(id: number): string;
}
