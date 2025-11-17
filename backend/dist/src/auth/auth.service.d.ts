import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    validateUser(LoginUserDto: LoginUserDto): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
