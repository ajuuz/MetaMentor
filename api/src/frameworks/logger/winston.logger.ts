import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";


const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }), // ensure stack trace is captured
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    return [
      `${timestamp} [${level.toUpperCase()}]`,
      `Message: ${message}`,
      stack ? `Stack:\n${stack}` : '',
      Object.keys(meta).length ? `Metadata:\n${JSON.stringify(meta, null, 2)}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  })
);



export const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  defaultMeta: { service: "meta-mentor" },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),

    // Daily Rotate for error logs
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d", // keep logs for 14 days
    }),

    // Daily Rotate for combined logs
    new DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      filename: "logs/exceptions-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});
