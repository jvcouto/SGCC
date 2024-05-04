"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listSubjects = exports.createSubject = void 0;
const subject_repository_1 = __importDefault(require("../../data-access/subject.repository"));
const create_1 = __importDefault(require("./create"));
const list_1 = __importDefault(require("./list"));
const subjectRepository = new subject_repository_1.default();
const createSubject = new create_1.default(subjectRepository);
exports.createSubject = createSubject;
const listSubjects = new list_1.default(subjectRepository);
exports.listSubjects = listSubjects;
//# sourceMappingURL=index.js.map