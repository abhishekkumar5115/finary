import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { EmailService } from '../email/email.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private userService;
    private jwtService;
    private emailService;
    private userRepository;
    constructor(userService: UsersService, jwtService: JwtService, emailService: EmailService, userRepository: Repository<User>);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        message: string;
    }>;
    validateUser(LoginUserDto: LoginUserDto): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    resendOtpVerification(email: string): Promise<{
        message: string;
    }>;
}
