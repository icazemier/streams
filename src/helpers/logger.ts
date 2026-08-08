import { createLogger, format, transports, LoggerOptions } from 'winston';
const { combine, splat, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    const msg = `${timestamp} [${level}] : ${message} `;
    return msg;
});

const logger = createLogger({
    level: 'silly',
    transports: [
        new transports.Console({
            level: 'warn',
            format: combine(format.colorize(), splat(), timestamp(), myFormat),
        }),
        new transports.File({
            filename: 'output.log',
            format: combine(splat(), timestamp(), myFormat),
        }),
    ],
} as LoggerOptions);
export { logger };
