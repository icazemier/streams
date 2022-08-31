import { createLogger, format, transports, LoggerOptions } from 'winston';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';
const { combine, splat, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    let msg = `${timestamp} [${level}] : ${message} `;
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
