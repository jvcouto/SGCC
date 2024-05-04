"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PDFService {
    constructor() {
        this.margin = 72;
        this.lastXWithMargin = 523.28;
        this.lastYWithMargin = 769.89;
    }
    startDoc(doc) {
        this.doc = doc;
    }
    writeTitle(value) {
        this.doc.fontSize(16);
        this.doc.text(value, {
            align: "center",
        });
    }
    writeSubTitle(value) {
        this.doc.moveDown(1);
        this.doc.fontSize(14);
        this.doc.text(value, {
            align: "left",
        });
    }
    content(value) {
        this.doc.fontSize(12);
        this.doc.moveDown(2).text(value);
    }
    horizontalDivisor() {
        this.doc
            .moveDown(2)
            .moveTo(this.doc.x, this.doc.y)
            .lineTo(this.lastXWithMargin, this.doc.y)
            .stroke();
    }
    get document() {
        return this.doc;
    }
}
exports.default = PDFService;
//# sourceMappingURL=pdf.service.js.map