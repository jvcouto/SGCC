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
const subjectOffer_model_1 = __importDefault(require("./subjectOffer.model"));
let TeachingPlan = class TeachingPlan extends abstractBase_model_1.default {
};
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TeachingPlan.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TeachingPlan.prototype, "methodology", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TeachingPlan.prototype, "ratingCriteria", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TeachingPlan.prototype, "substitute", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TeachingPlan.prototype, "serviceHours", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => subjectOffer_model_1.default),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", subjectOffer_model_1.default)
], TeachingPlan.prototype, "subjectOffer", void 0);
TeachingPlan = __decorate([
    (0, typeorm_1.Entity)("teaching_plan")
], TeachingPlan);
exports.default = TeachingPlan;
//# sourceMappingURL=teachingPlan.model.js.map