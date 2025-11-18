import { Controller, UnauthorizedException,Post,Body,HttpCode,HttpStatus, Get, Query } from '@nestjs/common';
import {AuthService} from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from './public.decorators';

@Controller('auth')
export class AuthController {
    constructor(private AuthService:AuthService){}

    @Public()
    @Post('register')
    async register(@Body() dto: CreateUserDto) {
    return this.AuthService.register(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    async signIn(@Body() loginUserDto:LoginUserDto){
        const user = await this.AuthService.validateUser(loginUserDto);

        if(!user) throw new UnauthorizedException("Invalid credentials");

        return this.AuthService.login(user);
    }

    @Public()
    @Post('/verify-otp')
    async verifyOtp(@Body() body :{email:string, otp:string}){
        return this.AuthService.verifyOtp(body.email,body.otp);
    }

    @Public()
    @Post('/resend-otp')
    async resendOtpVerification(@Body('email') email:string){
        return this.AuthService.resendOtpVerification(email);
    }
}
