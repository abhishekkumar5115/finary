import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private AuthService;
    constructor(AuthService: AuthService);
    register(dto: CreateUserDto): Promise<{
        id: string;
        email: string;
        full_name: string;
        is_email_verified: boolean;
        created_at: Date;
        clients: import("../clients/entities/client.entity").Client[];
        invoices: import("../invoices/entities/invoice.entity").Invoice[];
    }>;
    signIn(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    resendEmailVerification(email: string): Promise<{
        message: string;
    }>;
}
