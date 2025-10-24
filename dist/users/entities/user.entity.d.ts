import { Client } from '../../clients/entities/client.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    full_name: string;
    created_at: Date;
    clients: Client[];
}
