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
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const abstractBase_model_1 = __importDefault(require("./abstractBase.model"));
const user_model_1 = __importDefault(require("./user.model"));
const subject_model_1 = __importDefault(require("./subject.model"));
const courseAdmin_model_1 = __importDefault(require("./courseAdmin.model"));
var DayShift;
(function (DayShift) {
    DayShift["FULLTIME"] = "fulltime";
    DayShift["VESPERTINE"] = "vespertine";
    DayShift["NOCTURNAL"] = "nocturnal";
})(DayShift || (DayShift = {}));
let Course = class Course extends abstractBase_model_1.default {
};
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ length: 128, unique: true }),
    __metadata("design:type", String)
], Course.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Course.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: "enum", enum: DayShift }),
    __metadata("design:type", String)
], Course.prototype, "shift", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_model_1.default, (user) => user.colleges),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Course.prototype, "collegeMembers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => courseAdmin_model_1.default, (courseAdmin) => courseAdmin.course, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Course.prototype, "admins", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subject_model_1.default, (subject) => subject.course),
    __metadata("design:type", Array)
], Course.prototype, "subjects", void 0);
Course = __decorate([
    (0, typeorm_1.Entity)("course")
], Course);
exports.default = Course;
//# sourceMappingURL=course.model.js.map