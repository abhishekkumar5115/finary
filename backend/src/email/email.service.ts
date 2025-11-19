import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
    private readonly resend : Resend;
    constructor(
        private readonly configService:ConfigService,
    ){
        this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
    }

    async sendOtpEmail(to:string, otp:string){
        

        try {
            await this.resend.emails.send({
                from: 'welcome@finary.shop',
                to: to,
                subject: 'Welcome to Finary! Your Finary Verification Code',
                html:`
                <h1>Your Finary Verification Code</h1>
                <p>Your one-time password is:</p>
                <h2 style="font-size: 28px; letter-spacing: 4px;">${otp}</h2>
                <p>This code will expire in 10 minutes.</p>
                `,
            })
        } catch (error) {
            console.error('Email sending failed:', error);
            throw new Error('Failed to send OTP email.');
        }
    }
}
