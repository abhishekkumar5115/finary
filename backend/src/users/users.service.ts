import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../users/entities/user.entity'
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { email, full_name, password } = createUserDto;
    const existingUser = await this.userRepository.findOne({ where: { email: email } });
    if (existingUser) throw new ConflictException("Email already Exist!");
    const hasshedPassword = await bcrypt.hash(password, 10)

    //user entity
    const user = this.userRepository.create({
      email,
      full_name,
      password: hasshedPassword
    })
    return this.userRepository.save(user);
  }

  //add user bank account 
  async userBankAccount(userId:string,vpa : string){
    const user = await this.userRepository.findOne({where:{id:userId}});

    if (!user) throw new NotFoundException("User not found!");

    user.vpa_address = vpa;
    return this.userRepository.save(user);
  }

  async findAll() {
    const allUser = await this.userRepository.find();
    return allUser;
  }

  async findOneEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
  async findOneById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) throw new NotFoundException("user does not exist!");

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException("user not found. Can't delete!");
    }
    return result;
  }
}
