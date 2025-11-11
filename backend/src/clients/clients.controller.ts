import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Req } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from '@nestjs/passport';



@UseGuards(AuthGuard('jwt'))
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto,@Req() req) {
    return this.clientsService.create(createClientDto, req.user)
  }

  
  @Get()
  findAll(@Req() req) {
    return this.clientsService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string,@Req() req) {
    return this.clientsService.findOne(id, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto,@Req() req) {
    return this.clientsService.update(id, updateClientDto,req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Req() req) {
    return this.clientsService.remove(id,req.user);
  }
}
