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
const course_model_1 = __importDefault(require("./course.model"));
const user_model_1 = __importDefault(require("./user.model"));
var CourseAdminRole;
(function (CourseAdminRole) {
    CourseAdminRole["COORDINATOR"] = "coordinator";
    CourseAdminRole["VICE_COORDINATOR"] = "vice-coordinator";
    CourseAdminRole["SECRETARY"] = "secretary";
})(CourseAdminRole || (CourseAdminRole = {}));
let CourseAdmin = class CourseAdmin extends abstractBase_model_1.default {
};
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: "enum", enum: CourseAdminRole }),
    __metadata("design:type", String)
], CourseAdmin.prototype, "adminRole", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.ManyToOne)(() => course_model_1.default, { nullable: false }),
    __metadata("design:type", course_model_1.default)
], CourseAdmin.prototype, "course", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.ManyToOne)(() => user_model_1.default, { nullable: false }),
    __metadata("design:type", user_model_1.default)
], CourseAdmin.prototype, "user", void 0);
CourseAdmin = __decorate([
    (0, typeorm_1.Entity)()
], CourseAdmin);
exports.default = CourseAdmin;
//# sourceMappingURL=courseAdmin.model.js.map