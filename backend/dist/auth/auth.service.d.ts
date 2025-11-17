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
        id: string;
        email: string;
        full_name: string;
        is_email_verified: boolean;
        created_at: Date;
        clients: import("../clients/entities/client.entity").Client[];
        invoices: import("../invoices/entities/invoice.entity").Invoice[];
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    validateUser(LoginUserDto: LoginUserDto): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    resendEmailVerification(email: string): Promise<{
        message: string;
    }>;
}
