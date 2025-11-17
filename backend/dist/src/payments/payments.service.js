"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const invoices_service_1 = require("../invoices/invoices.service");
const invoice_entity_1 = require("../invoices/entities/invoice.entity");
const crypto = __importStar(require("crypto"));
let PaymentsService = class PaymentsService {
    configService;
    invoiceService;
    razorpaykeysecret;
    constructor(configService, invoiceService) {
        this.configService = configService;
        this.invoiceService = invoiceService;
        const secretKey = this.configService.get('RAZORPAY_KEY_SECRET');
        if (!secretKey) {
            throw new Error('RAZORPAY_KEY_SECRET is not defined in the configuration');
        }
        this.razorpaykeysecret = secretKey;
    }
    async verifyPayment(body) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, invoiceId } = body;
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expetedSign = crypto
            .createHmac('sha256', this.razorpaykeysecret)
            .update(sign.toString())
            .digest('hex');
        if (expetedSign !== razorpay_signature) {
            throw new common_1.BadRequestException("Invalid payment signature");
        }
        return this.invoiceService.updateInvoiceStatus(invoiceId, invoice_entity_1.InvoiceStatus.Paid);
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        invoices_service_1.InvoicesService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map