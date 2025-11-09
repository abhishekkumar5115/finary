import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {ConfigService,ConfigModule} from '@nestjs/config'
import {JwtStrategy} from './jwt.startegy'

@Module({
  imports: [
    UsersModule,
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
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy,PassportModule]
})
export class AuthModule {}
