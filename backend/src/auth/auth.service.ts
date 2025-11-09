import { Injectable, UnauthorizedException } from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {LoginUserDto} from '../users/dto/login-user.dto'
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private userService : UsersService,
        private jwtService : JwtService
    ){}


    //validate user, enter correct userId and Password
    async validateUser(LoginUserDto:LoginUserDto):Promise<any>{
        const user = await this.userService.findOneEmail(LoginUserDto.email);

        if(!user) throw new UnauthorizedException("user doesn't exist");

        const validPassword = await bcrypt.compare(LoginUserDto.password,user.password);
        if(!validPassword) throw new UnauthorizedException("Incorrect Password");

        const {password, ...result} = user
        return result;
    }

    

    async login(user:any){
        const payload = {email:user.email,sub:user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
