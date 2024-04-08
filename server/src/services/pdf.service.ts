export default class PDFService {
  private margin = 72;

  private lastXWithMargin = 523.28;

  private lastYWithMargin = 769.89;

  private doc!: PDFKit.PDFDocument;

  public startDoc(doc: PDFKit.PDFDocument) {
    this.doc = doc;
  }

  public writeTitle(value: string) {
    this.doc.fontSize(16);
    this.doc.text(value, {
      align: "center",
    });
  }

  public writeSubTitle(value: string) {
    this.doc.moveDown(1);
    this.doc.fontSize(14);
    this.doc.text(value, {
      align: "left",
    });
  }

  public content(value: string) {
    this.doc.fontSize(12);
    this.doc.moveDown(2).text(value);
  }

  public horizontalDivisor() {
    this.doc
      .moveDown(2)
      .moveTo(this.doc.x, this.doc.y)
      .lineTo(this.lastXWithMargin, this.doc.y)
      .stroke();
  }

  public get document(): PDFKit.PDFDocument {
    return this.doc;
  }
}
