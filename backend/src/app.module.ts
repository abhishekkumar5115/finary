import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Client } from './clients/entities/client.entity';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { InvoicesModule } from './invoices/invoices.module';
import { Invoice } from './invoices/entities/invoice.entity';
import { PaymentsModule } from './payments/payments.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        // If DATABASE_URL is present (Render/Production), use it directly
        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            entities: [User, Client, Invoice],
            synchronize: true, // Use true for development/MVP, false for strict production
            ssl: {
              rejectUnauthorized: false, // Required for managed databases on Render/Azure
            },
          };
        }

        // Fallback for local development using individual variables
        return {
          type: 'postgres',
          host: configService.get<string>('POSTGRES_HOST', 'localhost'),
          port: configService.get<number>('POSTGRES_PORT', 5432),
          username: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          database: configService.get<string>('POSTGRES_DB'),
          entities: [User, Client, Invoice],
          synchronize: true,
        };
      },
    }),
    UsersModule,
    AuthModule,
    ClientsModule,
    InvoicesModule,
    PaymentsModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
