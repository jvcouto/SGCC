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
var Subject_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const abstractBase_model_1 = __importDefault(require("./abstractBase.model"));
const class_validator_1 = require("class-validator");
const course_model_1 = __importDefault(require("./course.model"));
const departament_1 = __importDefault(require("./departament"));
const subjectOffer_model_1 = __importDefault(require("./subjectOffer.model"));
let Subject = Subject_1 = class Subject extends abstractBase_model_1.default {
};
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ length: 128 }),
    __metadata("design:type", String)
], Subject.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ length: 64 }),
    __metadata("design:type", String)
], Subject.prototype, "shortName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Subject.prototype, "places", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Subject.prototype, "semester", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Subject.prototype, "workload", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Subject.prototype, "theoreticalWorkload", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Subject.prototype, "praticalWorkload", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Subject.prototype, "optionalSubject", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Subject_1),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Subject.prototype, "preRequisite", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Subject_1),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Subject.prototype, "coRequisite", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Subject.prototype, "curriculum", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subject.prototype, "syllabus", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subject.prototype, "objective", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subject.prototype, "bibliography", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subject.prototype, "complementaryBibliography", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.ManyToOne)(() => course_model_1.default, (course) => course.subjects, {
        nullable: false,
    }),
    __metadata("design:type", course_model_1.default)
], Subject.prototype, "course", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.ManyToOne)(() => departament_1.default, {
        nullable: false,
    }),
    __metadata("design:type", departament_1.default)
], Subject.prototype, "departament", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subjectOffer_model_1.default, (subjectOffer) => subjectOffer.subject),
    __metadata("design:type", Array)
], Subject.prototype, "offers", void 0);
Subject = Subject_1 = __decorate([
    (0, typeorm_1.Entity)("subject"),
    (0, typeorm_1.Unique)(["name", "course", "curriculum"])
], Subject);
exports.default = Subject;
//# sourceMappingURL=subject.model.js.map