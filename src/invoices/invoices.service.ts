import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Client } from 'src/clients/entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice, InvoiceStatus } from './entities/invoice.entity';
import { User } from 'src/users/entities/user.entity';
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

    try{
      const order = await this.razorpay.orders.create(options);
      return order;
    }catch(error){
      throw new error('Failed to create new order');
    }
  }

  async findAll() {
    return await this.invoiceRepository.find({
      relations : ['client']
    })
  }

  findOne(id: string) {
    return  this.invoiceRepository.findOne({
      where:{id:id},
      relations:['client']
    });
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
