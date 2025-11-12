import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { UsersModule } from './users/users.module';
import {User} from './users/entities/user.entity'
import { Client } from './clients/entities/client.entity';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { InvoicesModule } from './invoices/invoices.module';
import { Invoice } from './invoices/entities/invoice.entity';
import { PaymentsModule } from './payments/payments.module';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST', 'localhost'),
        port: configService.get<number>('POSTGRES_PORT', 5432), // Use ConfigService
        username: configService.get<string>('POSTGRES_USER'),     // Use ConfigService
        password: configService.get<string>('POSTGRES_PASSWORD'), // Use ConfigService
        database: configService.get<string>('POSTGRES_DB'),       // Use ConfigService
        entities: [User, Client, Invoice],
        synchronize: true, // Note: Set to false in production
      }),
    }),
    UsersModule,
    AuthModule,
    ClientsModule,
    InvoicesModule,
    PaymentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
