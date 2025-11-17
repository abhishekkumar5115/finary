import { Injectable, UnauthorizedException,ConflictException } from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {LoginUserDto} from '../users/dto/login-user.dto'
import { EmailService } from '../email/email.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AuthService {
    constructor(
        private userService : UsersService,
        private jwtService : JwtService,
        private emailService : EmailService,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    //register user for email verification
    async register(createUserDto: CreateUserDto){

        const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
        });
        if (existingUser) {
        throw new ConflictException('Email already exists'); 
        }
        const token = crypto.randomBytes(32).toString('hex');

        //hashed password 
        const hashedPassword = await bcrypt.hash(createUserDto.password,10);

        const user = await this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
            is_email_verified : false,
            verification_token : token
        })

        const savedUser = await this.userRepository.save(user);

        try {
            await this.emailService.sendVerificationEmail(savedUser.email,token);
        } catch (error) {
            console.error('Failed to send email for user:', savedUser.id);
        }

        const { password, verification_token, ...safeUser } = savedUser;
        return safeUser;
    }

    //verifyEmail
    async verifyEmail(token:string){
        const user = await this.userRepository.findOne({
            where:{verification_token:token}
        })

        if(!user)throw new UnauthorizedException("Invalid or expired verification token.");

        user.is_email_verified = true;
        user.verification_token = null;

        await this.userRepository.save(user);
        return { message: "Email verified successfully." };
    }


    //validate user, enter correct userId and Password
    async validateUser(LoginUserDto:LoginUserDto):Promise<any>{
        const user = await this.userService.findOneEmail(LoginUserDto.email);

        if(!user) throw new UnauthorizedException("user doesn't exist");

        if (!user.is_email_verified)
        throw new UnauthorizedException('Please verify your email first.');

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

    async resendEmailVerification(email :string){
        const user = await this.userRepository.findOne({
            where:{email:email}
        })
        if (!user) {
        throw new UnauthorizedException("User does not exist.");
        }

        const newToken = await crypto.randomBytes(32).toString('hex');
        user.verification_token = newToken;
        await this.userRepository.save(user);

        try {
            await this.emailService.sendVerificationEmail(user.email,newToken);
        } catch (error) {
            console.error('Failed to resend verification email:', user.id);
        }

        return { message: "Verification email resent." };
    }
}
