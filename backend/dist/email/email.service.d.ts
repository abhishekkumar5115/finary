import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly configService;
    private readonly resend;
    constructor(configService: ConfigService);
    sendOtpEmail(to: string, otp: string): Promise<void>;
}
