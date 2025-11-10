import { ConflictException, Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User } from '../users/entities/user.entity'
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    const {email,full_name,password} = createUserDto;
    const existingUser = await this.userRepository.findOne({where:{email:email}});
    if(existingUser)throw new ConflictException("Email already Exist!");
    const hasshedPassword = await bcrypt.hash(password,10)

    //user entity
    const user = this.userRepository.create({
      email,
      full_name,
      password:hasshedPassword
    })
    return this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneEmail(email: string):Promise<User | null> {
    return this.userRepository.findOne({where:{email}});
  }
  async findOneById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
