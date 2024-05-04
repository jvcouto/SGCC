"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneDepartament = exports.createDepartament = exports.listDepartaments = void 0;
const departament_repository_1 = __importDefault(require("../../data-access/departament.repository"));
const list_1 = __importDefault(require("./list"));
const create_1 = __importDefault(require("./create"));
const findOne_1 = __importDefault(require("./findOne"));
const departamentRepository = new departament_repository_1.default();
const listDepartaments = new list_1.default(departamentRepository);
exports.listDepartaments = listDepartaments;
const createDepartament = new create_1.default(departamentRepository);
exports.createDepartament = createDepartament;
const findOneDepartament = new findOne_1.default(departamentRepository);
exports.findOneDepartament = findOneDepartament;
//# sourceMappingURL=index.js.map