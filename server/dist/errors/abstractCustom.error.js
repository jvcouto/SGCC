"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenericCustomError extends Error {
    constructor(message) {
        super(message);
        if (message) {
            this.message = message;
        }
    }
}
exports.default = GenericCustomError;
//# sourceMappingURL=abstractCustom.error.js.map