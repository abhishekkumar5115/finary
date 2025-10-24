import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,OneToMany} from 'typeorm'
import {Client} from '../../clients/entities/client.entity'

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

    @CreateDateColumn()
    created_at:Date;

    @OneToMany(()=>Client,(clients)=>clients.user)
    clients: Client[]

}
