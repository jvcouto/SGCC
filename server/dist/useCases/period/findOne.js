"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entityNotFound_error_1 = __importDefault(require("../../errors/entityNotFound.error"));
class FindOnePeriod {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        const periodFound = await this.repository.findOne(id);
        if (!periodFound)
            throw new entityNotFound_error_1.default("Period not found");
        return periodFound;
    }
}
exports.default = FindOnePeriod;
//# sourceMappingURL=findOne.js.map