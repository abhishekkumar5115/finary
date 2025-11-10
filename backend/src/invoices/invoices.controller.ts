import { Controller, Get, Post, Body, Patch, Param, Delete,Req } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { UseGuards } from '@nestjs/common';
import { Public } from '../auth/public.decorators';
import { JwtAuthGuard } from '../auth/jwt-auth-gaurd';

@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(
    private readonly invoicesService: InvoicesService,
  ) {}
  
  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto,@Req() req) {
    return this.invoicesService.create(createInvoiceDto,req.user);
  }
  //this route is for client paying the invoice 
  @Public()
  @Post(':id/create-order')
  createPaymentOrder(@Param('id') id:string){
    return this.invoicesService.createPaymentOrder(id);
  }

  @Get()
  findAll(@Req() req) {
    return this.invoicesService.findAll(req.user);
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto,@Req() req) {
    return this.invoicesService.update(id, updateInvoiceDto,req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Req() req) {
    return this.invoicesService.remove(id,req.user);
  }
}
