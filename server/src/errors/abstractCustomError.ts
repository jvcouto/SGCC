export default abstract class GenericCustomError extends Error {
  abstract status: number;

  abstract code: string;

  constructor(message: string) {
    super(message);
    if (message) {
      this.message = message;
    }
  }
}
