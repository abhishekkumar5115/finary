import { ForbiddenException, Injectable,NotFoundException, Req } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Client } from '../clients/entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice, InvoiceStatus } from './entities/invoice.entity';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import Razorpay from 'razorpay';

@Injectable()
export class InvoicesService {
  private razorpay : Razorpay
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private configService : ConfigService

  ) {
    this.razorpay = new Razorpay({
      key_id: this.configService.get<string>('RAZORPAY_KEY_ID'),
      key_secret: this.configService.get<string>('RAZORPAY_KEY_SECRET')
    })
  }

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


  //createPaymentorder for the client 
  async createPaymentOrder(invoiceId:string){
    const invoice = await this.invoiceRepository.findOne({where:{id:invoiceId}});
    if(!invoice)throw new NotFoundException("Invoice Not Found!");

    const options = {
      amount : invoice.amount*100,
      currency : 'INR',
      receipt : invoice.id,
    }

    try {
      const order = await this.razorpay.orders.create(options);
      return order;
    } catch (err) {
      throw new Error('Failed to create new order');
    }
  }

  async findAll(user: User) {
   return await this.invoiceRepository.find({
    where: { user: { id: user.id } },
    relations: ['client', 'user'],
    order: { created_at: 'DESC' },
  });
  }

  findOne(id: string) {
    return  this.invoiceRepository.findOne({
      where:{id:id},
      relations:['client']
    });
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto,user:any) {
    const invoice = await this.invoiceRepository.findOne({
      where:{id:id},
      relations:['user']
    })
    if(!invoice)throw new NotFoundException("Invoice Not found!");
    if(invoice.user.id !== user.id){
      throw new ForbiddenException("You are not authorized to edit this!");
    }
    Object.assign(invoice,updateInvoiceDto);
    return await this.invoiceRepository.save(invoice);
  }

  async updateInvoiceStatus(id:string,status:InvoiceStatus){
    const invoice = await this.invoiceRepository.findOne({
      where:{id:id}
    });
    if(!invoice){
      throw new NotFoundException("Invoice Not found!");
    }
    invoice.status = status;
    return this.invoiceRepository.save(invoice);
  }

  async remove(id: string,user:any) {
     const invoice = await this.invoiceRepository.findOne({
      where:{id:id},
      relations:['user']
    });
    if(!invoice)throw new NotFoundException("Invoice Not found!");
    if(invoice.user.id !== user.id){
      throw new ForbiddenException("You are not authorized to delete this!");
    }
    await this.invoiceRepository.remove(invoice);
    return {message:"Invoice deleted successfully!"};
  }
}
