import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    userBankAccount(userId: string, vpa: string): Promise<User>;
    findAll(): Promise<User[]>;
    findOneEmail(email: string): Promise<User | null>;
    findOneById(id: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
