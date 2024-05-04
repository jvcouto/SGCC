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
const subjectOffer_model_1 = __importDefault(require("./subjectOffer.model"));
const class_validator_1 = require("class-validator");
const user_model_1 = __importDefault(require("./user.model"));
let SubjectApprovalHistory = class SubjectApprovalHistory extends abstractBase_model_1.default {
};
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], SubjectApprovalHistory.prototype, "comment", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SubjectApprovalHistory.prototype, "approve", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.default),
    __metadata("design:type", user_model_1.default)
], SubjectApprovalHistory.prototype, "evaluator", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subjectOffer_model_1.default, (subjectOffer) => subjectOffer.subjectApprovalHistory),
    __metadata("design:type", subjectOffer_model_1.default)
], SubjectApprovalHistory.prototype, "subjectOffer", void 0);
SubjectApprovalHistory = __decorate([
    (0, typeorm_1.Entity)("subject_approval_history")
], SubjectApprovalHistory);
exports.default = SubjectApprovalHistory;
//# sourceMappingURL=subjectApprovalHistory.model.js.map