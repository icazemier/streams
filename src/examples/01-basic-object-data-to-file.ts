import { Transform, TransformCallback } from 'stream';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import { BaseExample } from './base-example.js';
import { logger, Files } from '../helpers/index.js';

interface DataToOutput {
    id: number;
    data: { name: string };
    timestamp: Date;
}

/**
 * A stream transformer which stringifies the object to be read by stdout
 */
const streamTransformer = () =>
    new Transform({
        readableObjectMode: false,
        writableObjectMode: true,
        transform(
            chunk: DataToOutput,
            _encoding: string,
            callback: TransformCallback
        ) {
            const { data, ...rest } = chunk;
            data.name = `${data.name} is GEK`;
            const transformed = { data, ...rest };

            this.push(`${JSON.stringify(transformed)}\n`);
            callback();
        },
    });

class BasicObjectDataToFile extends BaseExample {
    private data: DataToOutput[] = [];

    async preRun(): Promise<void> {
        // Just have a "big" chunk of data prepared (all in RAM :-( though...)
        logger.debug(`Start to clutter RAM now....`);
        for (let i = 0; i < 1e6; i++) {
            const payload = {
                id: i,
                data: { name: 'Arnold Schwarzenegger' },
                timestamp: new Date(),
            };
            this.data.push(payload);
            logger.info(`${i} Not blocking the eventloop!`);
            // console.info(`${i} Blockin' the eventloop :-(`);
        }
    }
    async example(): Promise<void> {
        // Prepare a file path were we can exhaust our data
        const streamToFilePath = join(
            Files.TEMP_DIR,
            '01-basic-object-data-to-file.txt'
        );
        const writeStream = createWriteStream(streamToFilePath, {
            encoding: 'utf-8',
        });
        await pipeline(this.data, streamTransformer(), writeStream);
    }
}

export { BasicObjectDataToFile };
