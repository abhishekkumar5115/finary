import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
export declare class AuthController {
    private AuthService;
    constructor(AuthService: AuthService);
    signIn(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
