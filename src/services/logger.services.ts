import winston from "winston";
import { currentDate } from "../utils/common/current_date";
export class Logger {
  route: string;
  logger: winston.Logger;
  constructor(route: string) {
    this.route = route;
    const logger = winston.createLogger({
      level: "info",
      format: winston.format.printf((info) => {
        let message = `${currentDate()} || ${info.level} || ${info.message}`;
        message = info.obj
          ? `${message} || DATA : ${JSON.stringify(info.obj)}`
          : message;
        return message;
      }),
      transports:
        process.env.NODE_ENV != "production"
          ? [
              new winston.transports.Console(),
              new winston.transports.File({ filename: `./log / ${route}.log` }),
            ]
          : [new winston.transports.File({ filename: `./log / ${route}.log` })],
    });
    this.logger = logger;
  }

  // info
  async info(message: string) {
    this.logger.log("info", message);
  }
  async infoWithObject(message: string, obj: any) {
    this.logger.log("info", message, { obj });
  }
  // error
  async error(message: string) {
    this.logger.log("error", message);
  }
  async errorWithObject(message: string, obj: any) {
    this.logger.log("error", message, { obj });
  }
  // debug
  async debug(message: string) {
    this.logger.log("debug", message);
  }
  async debugWithObject(message: string, obj: any) {
    this.logger.log("debug", message, { obj });
  }
}
