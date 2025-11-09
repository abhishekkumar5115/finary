import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { User } from '../users/entities/user.entity';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
export declare class ClientsService {
    private clientRepository;
    private userRepository;
    constructor(clientRepository: Repository<Client>, userRepository: Repository<User>);
    create(createClientDto: CreateClientDto, userPayload: any): Promise<Client>;
    findAll(user: User): Promise<Client[]>;
    findOne(id: string, user: any): string;
    update(id: string, updateClientDto: UpdateClientDto, user: User): Promise<Client>;
    remove(id: string): string;
}
