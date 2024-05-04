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
const user_model_1 = __importDefault(require("./user.model"));
const period_model_1 = __importDefault(require("./period.model"));
const class_validator_1 = require("class-validator");
const subject_model_1 = __importDefault(require("./subject.model"));
const subjectApprovalHistory_model_1 = __importDefault(require("./subjectApprovalHistory.model"));
const teachingPlan_model_1 = __importDefault(require("./teachingPlan.model"));
let SubjectOffer = class SubjectOffer extends abstractBase_model_1.default {
};
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({
        length: 16,
        default: "unique",
    }),
    __metadata("design:type", String)
], SubjectOffer.prototype, "class", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", Number)
], SubjectOffer.prototype, "places", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.ManyToOne)(() => period_model_1.default, { nullable: false }),
    __metadata("design:type", period_model_1.default)
], SubjectOffer.prototype, "period", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.ManyToOne)(() => subject_model_1.default, { nullable: false }),
    __metadata("design:type", subject_model_1.default)
], SubjectOffer.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subjectApprovalHistory_model_1.default, (subjectApprovalHistory) => subjectApprovalHistory.subjectOffer),
    __metadata("design:type", Array)
], SubjectOffer.prototype, "subjectApprovalHistory", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_model_1.default),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], SubjectOffer.prototype, "teachers", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], SubjectOffer.prototype, "closed", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => teachingPlan_model_1.default, (teachingPlan) => teachingPlan.subjectOffer),
    __metadata("design:type", teachingPlan_model_1.default)
], SubjectOffer.prototype, "teachingPlan", void 0);
SubjectOffer = __decorate([
    (0, typeorm_1.Entity)("subject_offer"),
    (0, typeorm_1.Unique)(["class", "subject", "period"])
], SubjectOffer);
exports.default = SubjectOffer;
//# sourceMappingURL=subjectOffer.model.js.map