import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {ConfigService,ConfigModule} from '@nestjs/config'
import {JwtStrategy} from './jwt.startegy'
import { JwtAuthGuard } from './jwt-auth-gaurd';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    UsersModule,
    EmailModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: (configService : ConfigService)=>({
        secret : configService.get<string>('JWT_SECRET'),
        signOptions:{expiresIn:'7d'}
      })
    })
  ],
  providers: [AuthService,JwtStrategy, {
      provide: APP_GUARD,
      useClass:JwtAuthGuard
    }],
  controllers: [AuthController],
  exports: [JwtStrategy,PassportModule]
})
export class AuthModule {}
