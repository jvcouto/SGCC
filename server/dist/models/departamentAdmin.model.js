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
const departament_1 = __importDefault(require("./departament"));
var DepartamentAdminRole;
(function (DepartamentAdminRole) {
    DepartamentAdminRole["CHIEF"] = "chief";
    DepartamentAdminRole["SUB_CHIEF"] = "sub-chief";
    DepartamentAdminRole["SECRETARY"] = "secretary";
})(DepartamentAdminRole || (DepartamentAdminRole = {}));
let DepartamentAdmin = class DepartamentAdmin extends abstractBase_model_1.default {
};
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: "enum", enum: DepartamentAdminRole }),
    __metadata("design:type", String)
], DepartamentAdmin.prototype, "adminRole", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => departament_1.default, { nullable: false }),
    __metadata("design:type", departament_1.default)
], DepartamentAdmin.prototype, "departament", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.default, { nullable: false }),
    __metadata("design:type", user_model_1.default)
], DepartamentAdmin.prototype, "user", void 0);
DepartamentAdmin = __decorate([
    (0, typeorm_1.Entity)()
], DepartamentAdmin);
exports.default = DepartamentAdmin;
//# sourceMappingURL=departamentAdmin.model.js.map