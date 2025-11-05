import { User } from '../../users/entities/user.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
export declare class Client {
    id: string;
    name: string;
    email: string;
    user: User;
    invoices: Invoice[];
}
