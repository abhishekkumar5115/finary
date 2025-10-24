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
    user: { id: userPayload.userId }, 
  });
  return this.clientRepository.save(newClient);
  }

  async findAll(user:User) {
    return await this.clientRepository.findBy({ user: { id: user.id } });
  }

  findOne(id: string,user:any) {
    return `This action returns a #${id} client`;
  }

  async update(id: string, updateClientDto: UpdateClientDto, user: User) {
    const client = await this.clientRepository.findOneBy({
      id,
      user: { id: user.id },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    Object.assign(client, updateClientDto);
    return this.clientRepository.save(client);
  }

  remove(id: string) {
    return `This action removes a #${id} client`;
  }
}
