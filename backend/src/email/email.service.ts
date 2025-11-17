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

    async sendVerificationEmail(to:string, from:string){
        const verificationLink = `http://http://4.224.156.116/verify-email?token=&{token}`;

        try {
            await this.resend.emails.send({
                from: 'onboarding@resend.dev',
                to: to,
                subject: 'Welcome to Finary! Please verify your email.',
                html:`
                  <h1>Welcome to Finary!</h1>
                  <p>Click the link below to verify your email address:</p>
                  <a href="${verificationLink}">Verify My Email</a>
                `,
            })
        } catch (error) {
            console.error('Email sending failed:', error);
            throw new Error('Failed to send verification email.');
        }
    }
}
