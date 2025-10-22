import { Controller, UnauthorizedException,Post,Body,HttpCode,HttpStatus } from '@nestjs/common';
import {AuthService} from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private AuthService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() loginUserDto:LoginUserDto){
        const user = await this.AuthService.validateUser(loginUserDto);

        if(!user) throw new UnauthorizedException("Invalid credentials");

        return this.AuthService.login(user);
    }

}
