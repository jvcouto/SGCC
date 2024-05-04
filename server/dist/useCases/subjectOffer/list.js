"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
const invalidQueryStringItem_error_1 = __importDefault(require("../../errors/invalidQueryStringItem.error"));
class List {
    constructor(repository) {
        this.repository = repository;
        this.PERMITTED_QUERY_ITEMS = ["page", "period"];
    }
    _validadeQueryString(query) {
        for (const key in query) {
            if (!this.PERMITTED_QUERY_ITEMS.includes(key)) {
                throw new invalidQueryStringItem_error_1.default("Invalid query item");
            }
        }
        return query;
    }
    async execute(user, query) {
        const queryItems = this._validadeQueryString(query);
        try {
            const subjectOffers = await this.repository.find({
                query: queryItems,
                user,
            });
            return subjectOffers;
        }
        catch (error) {
            logger_1.default.error(error.message);
            throw new server_error_1.default("Error fetching subject offers");
        }
    }
}
exports.default = List;
//# sourceMappingURL=list.js.map