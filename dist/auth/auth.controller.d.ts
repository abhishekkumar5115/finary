import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginUserdto: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
