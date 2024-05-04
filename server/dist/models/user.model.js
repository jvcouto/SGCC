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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const course_model_1 = __importDefault(require("./course.model"));
const departament_1 = __importDefault(require("./departament"));
const courseAdmin_model_1 = __importDefault(require("./courseAdmin.model"));
const departamentAdmin_model_1 = __importDefault(require("./departamentAdmin.model"));
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({
        length: 128,
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        length: 128,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({
        length: 256,
        select: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, typeorm_1.Column)({ name: "sys_admin", default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "sysAdmin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, typeorm_1.Column)({ name: "fisrt_login", default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "firstLogin", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => course_model_1.default, (course) => course.collegeMembers),
    __metadata("design:type", Array)
], User.prototype, "colleges", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => courseAdmin_model_1.default, (courseAdmin) => courseAdmin.user),
    __metadata("design:type", Array)
], User.prototype, "courseAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => departamentAdmin_model_1.default, (departamentAdmin) => departamentAdmin.user),
    __metadata("design:type", Array)
], User.prototype, "departamentAdmin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => departament_1.default, (departament) => departament.teachers),
    __metadata("design:type", departament_1.default)
], User.prototype, "departament", void 0);
User = __decorate([
    (0, typeorm_1.Entity)("user")
], User);
exports.default = User;
//# sourceMappingURL=user.model.js.map