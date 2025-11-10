import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {AuthGuard} from '@nestjs/passport'
import {Public} from '../auth/public.decorators'


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req){
    return this.usersService.findOneById(req.user.userId);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('email')
  findOneEmail(@Param('email') email: string) {
    return this.usersService.findOneEmail(email);
  }
  @Get(':id')
  findOneId(@Param('id')id:string){
    return this.usersService.findOneById(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
