import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config'
import { UsersModule } from './users/users.module';
import {User} from './users/entities/user.entity'
import { Client } from './clients/entities/client.entity';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User,Client],
      synchronize: true

    }),
    UsersModule,
    AuthModule,
    ClientsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
