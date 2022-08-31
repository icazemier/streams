import { Readable, Transform, TransformCallback } from 'stream';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { BaseExample } from './base-example';
import { asyncIterable } from '../helpers';
import { Files } from '../helpers/files';

interface DataToOutput {
    id: number;
    data: { name: string };
    timestamp: Date;
}

/**
 * A stream transformer demo which stringifies the object
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

class AsyncObjectDataToFile extends BaseExample {
    async preRun(): Promise<void> {
        // Nothing
    }

    async example(): Promise<void> {
        // Read source with 100 records (simulates incoming data asynchronously with random delay 0-10ms)
        const readable = Readable.from(asyncIterable(10, 20, 100), {
            objectMode: true,
        });
        // Prepare a file path were we can exhaust our data
        const streamToFilePath = join(
            Files.TEMP_DIR,
            '02-object-async-data-to-file.txt'
        );
        const writeStream = createWriteStream(streamToFilePath, {
            encoding: 'utf-8',
        });
        await pipeline(readable, streamTransformer(), writeStream);
    }
}

export { AsyncObjectDataToFile };
