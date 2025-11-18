import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private AuthService;
    constructor(AuthService: AuthService);
    register(dto: CreateUserDto): Promise<{
        message: string;
    }>;
    signIn(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
    verifyOtp(body: {
        email: string;
        otp: string;
    }): Promise<{
        message: string;
    }>;
    resendOtpVerification(email: string): Promise<{
        message: string;
    }>;
}
