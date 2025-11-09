"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = exports.Is_Public_Key = void 0;
const common_1 = require("@nestjs/common");
exports.Is_Public_Key = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.Is_Public_Key, true);
exports.Public = Public;
//# sourceMappingURL=public.decorators.js.map