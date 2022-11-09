import { createLogger, transports, format } from "winston";

export const logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `APP [${timestamp}] ${level}: ${message}`;
      })
    )
  });
  