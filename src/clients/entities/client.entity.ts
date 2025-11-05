import {Entity,Column,PrimaryGeneratedColumn,ManyToOne, JoinColumn,OneToMany} from 'typeorm';
import {User} from '../../users/entities/user.entity'
import { Invoice } from 'src/invoices/entities/invoice.entity';

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    email:string

    @ManyToOne(()=> User, (user)=> user.clients ,{ eager: true })
    @JoinColumn({ name: 'user_id' })
    user:User

    @OneToMany(()=>Invoice,(invoices)=>invoices.client)
    invoices:Invoice[]
}
