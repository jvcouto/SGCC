import pino from "pino";

class Logger {
  private static readonly logger = pino({
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: true,
      },
    },
  });

  static info(msg: string) {
    Logger.logger.info(msg);
  }

  static error(msg: string) {
    Logger.logger.error(msg);
  }
}

export default Logger;
