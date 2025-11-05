import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Client } from 'src/clients/entities/client.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice, InvoiceStatus } from './entities/invoice.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto,userPayload:any) {

    const user = await this.userRepository.findOne({
      where:{id:userPayload.user_id}
    })

    if(!user)throw new NotFoundException("User not found")

    const client = await this.clientRepository.findOne({
      where:{
        id: createInvoiceDto.client_id,
        user: {id: userPayload.user_id}
      },
      relations:['user']
    })
    if(!client)throw new NotFoundException("Client Not Found");
    const newInvoice =  this.invoiceRepository.create({
      amount: createInvoiceDto.amount,
      due_date: createInvoiceDto.due_date,
      invoice_number: 'INV-'+ Date.now(),
      status:InvoiceStatus.Draft,
      user,
      client,
    })
    return await this.invoiceRepository.save(newInvoice);
  }

  findAll() {
    return `This action returns all invoices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
