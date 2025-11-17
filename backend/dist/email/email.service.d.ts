import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly configService;
    private readonly resend;
    constructor(configService: ConfigService);
    sendVerificationEmail(to: string, from: string): Promise<void>;
}
