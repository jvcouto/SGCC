"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
class Logger {
    static info(msg) {
        Logger.logger.info(msg);
    }
    static error(msg) {
        Logger.logger.error(msg);
    }
}
Logger.logger = (0, pino_1.default)({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: true,
        },
    },
});
exports.default = Logger;
//# sourceMappingURL=logger.js.map