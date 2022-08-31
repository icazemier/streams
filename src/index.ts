// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { runServer } from './examples/video/index.js';
import {
    AsyncObjectDataToFile,
    AsyncObjectDataToCSV,
    BasicObjectDataToFile,
    SyncObjectDataToCSV,
    SyncObjectDataToCSVToZip,
    BackToBasic,
} from './examples/index.js';
import { BaseExample } from './examples/base-example.js';
import { Files, timeout } from './helpers/index.js';

const jobs: typeof BaseExample[] = [
    BasicObjectDataToFile,
    AsyncObjectDataToFile,
    AsyncObjectDataToCSV,
    SyncObjectDataToCSV,
    SyncObjectDataToCSVToZip,
    BackToBasic,
];

const go = async () => {
    Files.createTempDirIfNotExist();

    for (let Job; (Job = jobs.shift()); ) {
        const job = new Job();
        await job.run();
        await timeout(500);
    }
};

go();
