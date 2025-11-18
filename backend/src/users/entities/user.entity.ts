import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,OneToMany} from 'typeorm'
import {Client} from '../../clients/entities/client.entity'
import { Invoice } from '../../invoices/entities/invoice.entity';
import { text } from 'stream/consumers';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique:true})
    email: string;

    @Column()
    password:string;

    @Column()
    full_name:string;

    @Column({ default: false })
    is_email_verified: boolean;

    @Column({type:'text' , nullable: true })
    otp_code: string | null; 

    @Column({ type: 'timestamp', nullable: true })
    otp_expires_at: Date | null;

    @CreateDateColumn()
    created_at:Date;

    @OneToMany(()=>Client,(clients)=>clients.user)
    clients: Client[]

    @OneToMany(()=>Invoice,(invoices)=>invoices.user)
    invoices:Invoice[]

}
