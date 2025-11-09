import { Controller, Get, Post, Body, Patch, Param, Delete,Req } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/auth/public.decorators';
import { JwtAuthGaurd } from 'src/auth/jwt-auth-gaurd';

@UseGuards(JwtAuthGaurd)
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
  findAll() {
    return this.invoicesService.findAll();
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(+id);
  }
}
