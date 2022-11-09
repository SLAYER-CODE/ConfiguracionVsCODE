import { createLogger, transports, format } from "winston";

export const logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `APP [${timestamp}] ${level}: ${message}`;
      })
    ),level:"debug"
  });


  export const loggerResolvers = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `RESOLVER [${timestamp}] ${level}: ${message}`;
      })
    ),level:"debug"
  });
  
  