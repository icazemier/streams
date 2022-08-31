import { Readable, Transform, TransformCallback } from 'stream';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { stringify, Options } from 'csv-stringify';
import { BaseExample } from './base-example.js';
import { asyncGenerator, Files } from '../helpers/index.js';

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
        readableObjectMode: true,
        writableObjectMode: true,
        transform(
            chunk: DataToOutput,
            _encoding: string,
            callback: TransformCallback
        ) {
            const {
                data: { name },
                ...rest
            } = chunk;
            const transformed = { name, ...rest };
            this.push(transformed);
            callback();
        },
    });

const object2csvStream = (): Transform => {
    // Ask delegate to deliver data key to Column caption mappings
    const columns = {
        id: 'Arnold Id',
        name: 'Name',
        timestamp: 'Moment of time folding',
    };
    const options = {
        bom: true,
        header: true,
        columns,
        cast: {
            // Automatically format Date types
            date: (value: Date) => {
                return value.toISOString();
            },
        },
    } as Options;
    // Prepare Object 2 CSV stream pipeline
    return stringify(options);
};

class AsyncObjectDataToCSV extends BaseExample {
    async example(): Promise<void> {
        // Read source with 100 records (simulates incoming data asynchronously with random delay 0-10ms)
        const readable = Readable.from(asyncGenerator(0, 10, 100), {
            objectMode: true,
        });
        // Prepare a file path were we can exhaust our data
        const streamToFilePath = join(
            Files.TEMP_DIR,
            '03-object-async-data-to-csv.csv'
        );
        const writeStream = createWriteStream(streamToFilePath, {
            encoding: 'utf-8',
        });
        await pipeline(
            readable,
            streamTransformer(),
            object2csvStream(),
            writeStream
        );
    }
}

export { AsyncObjectDataToCSV };
