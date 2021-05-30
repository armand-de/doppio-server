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
exports.VerifyUserDto = void 0;
const class_validator_1 = require("class-validator");
class VerifyUserDto {
}
__decorate([
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(8),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], VerifyUserDto.prototype, "nickname", void 0);
__decorate([
    class_validator_1.MinLength(7),
    class_validator_1.MaxLength(30),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], VerifyUserDto.prototype, "password", void 0);
__decorate([
    class_validator_1.MinLength(7),
    class_validator_1.MaxLength(15),
    class_validator_1.IsMobilePhone(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], VerifyUserDto.prototype, "phone", void 0);
__decorate([
    class_validator_1.Length(6),
    class_validator_1.IsNumberString(),
    __metadata("design:type", String)
], VerifyUserDto.prototype, "verifyNumber", void 0);
exports.VerifyUserDto = VerifyUserDto;
//# sourceMappingURL=verify-user.dto.js.map