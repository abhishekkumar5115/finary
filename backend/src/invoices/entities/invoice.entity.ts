import {Entity,Column,PrimaryColumn,CreateDateColumn,ManyToOne} from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { Client } from '../../clients/entities/client.entity'
import { Decimal128 } from 'typeorm/browser'

export enum InvoiceStatus{
    Draft = "Draft",
    Sent = "Sent",
    Paid = "Paid",
    Overdue = "Overdue"
}

@Entity('invoices')
export class Invoice {
    @PrimaryColumn('uuid', {
        default: () => 'gen_random_uuid()', 
        name: 'id',
    })
    id: string;

    @Column()
    invoice_number:string

    @Column({type:'decimal'})
    amount : number

    @Column({default:'INR'})
    currency:string

    @Column({
        type:'enum',
        enum:InvoiceStatus,
        default:InvoiceStatus.Draft
    })
    status: InvoiceStatus

    @Column({type:'date'})
    due_date:Date

    @CreateDateColumn()
    created_at:Date

    @ManyToOne(()=>User, (user)=>user.invoices,{
    onDelete: 'CASCADE',
    })
    user:User

    @ManyToOne(()=>Client, (client)=>client.invoices)
    client:Client
}
