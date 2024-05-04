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
const abstractBase_model_1 = __importDefault(require("./abstractBase.model"));
const class_validator_1 = require("class-validator");
const user_model_1 = __importDefault(require("./user.model"));
const departamentAdmin_model_1 = __importDefault(require("./departamentAdmin.model"));
const subject_model_1 = __importDefault(require("./subject.model"));
let Departament = class Departament extends abstractBase_model_1.default {
};
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ length: 128, unique: true }),
    __metadata("design:type", String)
], Departament.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ length: 32, unique: true }),
    __metadata("design:type", String)
], Departament.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => departamentAdmin_model_1.default, (departamentAdmin) => departamentAdmin.departament, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Departament.prototype, "admins", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_model_1.default, (user) => user.departament),
    __metadata("design:type", Array)
], Departament.prototype, "teachers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subject_model_1.default, (subject) => subject.departament),
    __metadata("design:type", Array)
], Departament.prototype, "subjects", void 0);
Departament = __decorate([
    (0, typeorm_1.Entity)("departament")
], Departament);
exports.default = Departament;
//# sourceMappingURL=departament.js.map