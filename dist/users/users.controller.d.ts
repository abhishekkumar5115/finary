import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    getProfile(req: any): Promise<import("./entities/user.entity").User | null>;
    findAll(): string;
    findOneEmail(email: string): Promise<import("./entities/user.entity").User | null>;
    findOneId(id: string): Promise<import("./entities/user.entity").User | null>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
