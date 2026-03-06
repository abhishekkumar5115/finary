import { Module, Logger } from '@nestjs/common';
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
        const logger = new Logger('DatabaseConfig');
        
        // Priority 1: Check standard DATABASE_URL (Render/Heroku standard)
        // We also check process.env directly as a backup
        const databaseUrl = configService.get<string>('POSTGRES_DB') || process.env.POSTGRES_DB;

        if (databaseUrl) {
          logger.log('Connecting to database via DATABASE_URL (Production mode)');
          return {
            type: 'postgres',
            url: databaseUrl,
            entities: [User, Client, Invoice],
            synchronize: true, 
            ssl: {
              rejectUnauthorized: false,
            },
          };
        }

        // Priority 2: Fallback for local development
        logger.warn('DATABASE_URL not found, falling back to localhost configuration');
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
