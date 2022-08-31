import { join } from 'node:path';
import { Readable, Transform, TransformCallback } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';
import { Files, syncGenerator, logger } from '../helpers/index.js';
import { BaseExample } from './base-example.js';

const streamTransformer = () =>
    new Transform({
        readableObjectMode: true,
        writableObjectMode: true,
        transform(
            chunk: unknown,
            _encoding: string,
            callback: TransformCallback
        ) {
            this.push(`${JSON.stringify(chunk)}\n`);
            callback();
        },
    });

class BackToBasic extends BaseExample {
    async example(): Promise<void> {
        try {
            let readableStep = 0;
            let writableStep = 0;

            // Read source with 100 records (simulates incoming data synchronously to speed thing up for the demo)
            const readable = Readable.from(syncGenerator(100), {
                objectMode: true,
            });

            const streamToFilePath = join(
                Files.TEMP_DIR,
                '07-back-to-basic.txt'
            );
            const writeStream = createWriteStream(streamToFilePath, {
                encoding: 'utf-8',
            });

            // Readble event listeners
            readable.on('data', (/*chunk*/) => {
                logger.debug(
                    `${++readableStep} A readable "data" event received`
                );
            });
            readable.on('error', (error) => {
                logger.error(error);
            });
            readable.on('end', () => {
                logger.debug(
                    `${++readableStep} A readable "end" event received`
                );
            });
            readable.on('close', () => {
                logger.debug(
                    `${++readableStep} A readable "close" event received`
                );
            });
            readable.on('pause', () => {
                logger.debug(
                    `${++readableStep} A readable "pause" event received`
                );
            });
            // readable.on('readable', () => {
            //     console.info(`${++step} A readable "readable" event received`);
            // });
            readable.on('resume', () => {
                logger.debug(
                    `${++readableStep} A readable "resume" event received`
                );
            });

            // Write stream event listeners
            writeStream.on('drain', () => {
                logger.silly(
                    `${++writableStep} A writeStream "drain" event received`
                );
            });
            writeStream.on('close', () => {
                logger.silly(
                    `${++writableStep} A writeStream "close" event received`
                );
            });
            writeStream.on('error', (error) => {
                logger.error(error);
            });
            writeStream.on('pipe', () => {
                logger.silly(
                    `${++writableStep} A writeStream "pipe" event received`
                );
            });
            writeStream.on('unpipe', () => {
                logger.silly(
                    `${++writableStep} A writeStream "unpipe" event received`
                );
            });
            writeStream.on('finish', () => {
                logger.silly(
                    `${++writableStep} A writeStream "finish" event received`
                );
            });
            writeStream.on('ready', () => {
                logger.silly(
                    `${++writableStep} A writeStream "ready" event received`
                );
            });

            await pipeline(readable, streamTransformer(), writeStream);
        } catch (error) {
            throw error;
        }
    }
}

export { BackToBasic };
