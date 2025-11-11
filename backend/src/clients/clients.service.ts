import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import {User} from '../users/entities/user.entity'
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,

    @InjectRepository(User)
    private userRepository : Repository<User>
  ){}
  create(createClientDto: CreateClientDto, userPayload: any) {
  const newClient = this.clientRepository.create({
    ...createClientDto,
    user: { id: userPayload.user_id }, 
  });
  return this.clientRepository.save(newClient);
  }

  async findAll(user:any) {
    return await this.clientRepository.find({
    where: { user: { id: user.user_id} },
    relations: ['user'],
  });
  }

  findOne(id: string,user:any) {
    return `This action returns a #${id} client`;
  }

  async update(id: string, updateClientDto: UpdateClientDto, user: any) {
    const client = await this.clientRepository.findOneBy({
      id,
      user: { id: user.user_id },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    Object.assign(client, updateClientDto);
    return this.clientRepository.save(client);
  }

  async remove(id: string,user:any) {
    const client = await this.clientRepository.findOne({
      where:{id,user:{id:user.user_id}}
    })

    if(!client)throw new NotFoundException("Client Not Found!")
    await this.clientRepository.remove(client);
    return {message:"client deleted successfully!"}
  }
}
