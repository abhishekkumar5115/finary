import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { EmailService } from '../email/email.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //register user for email-otp verification
  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expirationTime = new Date(Date.now() + 10 * 60 * 1000);

    //hashed password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      is_email_verified: false,
      otp_code: otp,
      otp_expires_at: expirationTime,
    });

    const savedUser = await this.userRepository.save(user);

    try {
      await this.emailService.sendOtpEmail(savedUser.email, otp);
    } catch (error) {
      console.error('Failed to send email for user:', savedUser.id);
    }

    return {
      message: 'OTP sent to email. Please verify to continue.',
    };
  }

  //verifyEmail
  async verifyOtp(email: string, otp: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('User Not Found!');

    if (user.otp_code !== otp) throw new UnauthorizedException('Invalid OTP');

    if (!user.otp_expires_at || new Date() > user.otp_expires_at)
      throw new UnauthorizedException('OTP has Expired!');

    user.is_email_verified = true;
    user.otp_code = null;
    user.otp_expires_at = null;

    await this.userRepository.save(user);
    return { message: 'Email verified successfully.' };
  }

  //validate user, enter correct userId and Password
  async validateUser(LoginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userService.findOneEmail(LoginUserDto.email);

    if (!user) throw new UnauthorizedException("user doesn't exist");

    if (!user.is_email_verified)
      throw new UnauthorizedException('Please verify your email first.');

    const validPassword = await bcrypt.compare(
      LoginUserDto.password,
      user.password,
    );
    if (!validPassword) throw new UnauthorizedException('Incorrect Password');

    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  //otp resend 
  async resendOtpVerification(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new UnauthorizedException('User does not exist.');
    }
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    user.otp_code = newOtp;
    user.otp_expires_at = expiresAt;
    await this.userRepository.save(user);

    try {
      await this.emailService.sendOtpEmail(user.email, newOtp);
    } catch (error) {
      console.error("Failed to resend OTP email for user:", user.id);
    }

    return { message: "OTP resent successfully."};
  }
}
