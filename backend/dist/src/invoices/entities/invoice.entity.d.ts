import { User } from '../../users/entities/user.entity';
import { Client } from '../../clients/entities/client.entity';
export declare enum InvoiceStatus {
    Draft = "Draft",
    Sent = "Sent",
    Paid = "Paid",
    Overdue = "Overdue"
}
export declare class Invoice {
    id: string;
    invoice_number: string;
    amount: number;
    currency: string;
    status: InvoiceStatus;
    due_date: Date;
    created_at: Date;
    user: User;
    client: Client;
}
