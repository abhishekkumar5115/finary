import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {User} from './entities/user.entity'
import { Client } from 'src/clients/entities/client.entity';


@Module({
  imports:[TypeOrmModule.forFeature([User,Client])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule,UsersService]
})
export class UsersModule {}
