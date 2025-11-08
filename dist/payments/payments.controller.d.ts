import { ConfigService } from '@nestjs/config';
export declare class PaymentsController {
    private readonly configService;
    constructor(configService: ConfigService);
    getRazorpayKey(): {
        key: string | undefined;
    };
}
