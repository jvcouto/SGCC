"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        const message = "Token not provided";
        logger_1.default.error(message);
        return res.status(401).json({ message: message, code: "TOKEN_NOT_FOUND" });
    }
    const token = authorization.replace("Bearer", "").trim();
    try {
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
        const { id, userRoles } = data;
        req.user = { id, userRoles };
        return next();
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(401).json({
            message: "Error on user authentication!",
            code: "INVALID_TOKEN",
        });
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map