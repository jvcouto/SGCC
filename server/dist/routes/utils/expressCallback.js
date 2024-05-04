"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstractCustom_error_1 = __importDefault(require("../../errors/abstractCustom.error"));
const httpStatusCodes_1 = __importDefault(require("../../utils/constants/httpStatusCodes"));
const logger_1 = __importDefault(require("../../utils/logger"));
exports.default = (controller) => (req, res, next) => {
    const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        path: req.path,
        user: req.user,
        source: {
            ip: req.ip,
            browser: req.get("User-Agent"),
        },
        headers: {
            "Content-Type": req.get("Content-Type"),
            Referer: req.get("referer"),
            "User-Agent": req.get("User-Agent"),
            authorization: req.get("authorization"),
        },
    };
    logger_1.default.info(`${req.method} - ${req.originalUrl}`);
    controller(httpRequest)
        .then((response) => {
        if (httpRequest.path.includes("download/pdf")) {
            res.setHeader("Content-disposition", `attachment; filename=${new Date().toISOString()}.pdf`);
            res.setHeader("Content-type", "application/pdf");
            const { data: docData } = response;
            docData.pipe(res);
            docData.end();
            res.status(response.status);
            return next();
        }
        res.set("Content-Type", "application/json");
        const body = {
            data: response.data,
            meta: response.meta ?? {},
        };
        res.status(response.status).json(body);
    })
        .catch((e) => {
        e instanceof abstractCustom_error_1.default
            ? logger_1.default.error(e.message)
            : logger_1.default.error(e);
        res.status(e.status ?? httpStatusCodes_1.default.INTERNAL_SERVER_ERROR).json({
            code: e.code ?? "INTERNAL_SERVER_ERROR",
            message: e instanceof abstractCustom_error_1.default ? e.message : "Server Error",
        });
    });
};
//# sourceMappingURL=expressCallback.js.map