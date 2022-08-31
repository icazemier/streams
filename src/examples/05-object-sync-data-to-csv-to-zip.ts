import { Readable, Transform, TransformCallback } from 'stream';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';
import { createGzip, ZlibOptions } from 'zlib';

import { join } from 'path';
import { stringify, Options } from 'csv-stringify';
import { BaseExample } from './base-example';
import { syncIterable } from '../helpers';
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

class SyncObjectDataToCSVToZip extends BaseExample {
    async preRun(): Promise<void> {
        // Nothing
    }

    async example(): Promise<void> {
        // Read source with 2 * 10^6 records (simulates incoming data synchronously to speed thing up for the demo)
        const readable = Readable.from(syncIterable(2e6), {
            objectMode: true,
        });

        // Prepare a file path were we can exhaust our data
        const streamToFilePath = join(
            Files.TEMP_DIR,
            '05-object-sync-data-to-csv-to-zip.csv.gz'
        );

        // Prepare file where to put all the data (Writable)
        const writeStream = createWriteStream(streamToFilePath);

        // Prepare compression (Transformer)
        const gZipStream = createGzip({ level: 9 } as ZlibOptions);

        await pipeline(
            readable,
            streamTransformer(),
            object2csvStream(),
            gZipStream,
            writeStream
        );
    }
}

export { SyncObjectDataToCSVToZip };
