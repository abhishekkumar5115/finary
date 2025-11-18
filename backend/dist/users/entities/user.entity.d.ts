import { Client } from '../../clients/entities/client.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    full_name: string;
    is_email_verified: boolean;
    otp_code: string | null;
    otp_expires_at: Date | null;
    created_at: Date;
    clients: Client[];
    invoices: Invoice[];
}
