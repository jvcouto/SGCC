"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPeriod = exports.listPeriods = exports.createPeriod = void 0;
const create_1 = __importDefault(require("./create"));
const list_1 = __importDefault(require("./list"));
const findOne_1 = __importDefault(require("./findOne"));
const period_repository_1 = __importDefault(require("../../data-access/period.repository"));
const periodRepository = new period_repository_1.default();
const createPeriod = new create_1.default(periodRepository);
exports.createPeriod = createPeriod;
const listPeriods = new list_1.default(periodRepository);
exports.listPeriods = listPeriods;
const findPeriod = new findOne_1.default(periodRepository);
exports.findPeriod = findPeriod;
//# sourceMappingURL=index.js.map