"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const public_decorators_1 = require("../auth/public.decorators");
let PaymentsController = class PaymentsController {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    getRazorpayKey() {
        return { 'key': this.configService.get('RAZORPAY_KEY_ID') };
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, public_decorators_1.Public)(),
    (0, common_1.Get)('Razorpay-key'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "getRazorpayKey", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map