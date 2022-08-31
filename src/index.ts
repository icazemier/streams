import {
    AsyncObjectDataToFile,
    AsyncObjectDataToCSV,
    BasicObjectDataToFile,
    SyncObjectDataToCSV,
    SyncObjectDataToCSVToZip,
} from './examples';
import { BaseExample } from './examples/base-example';
import { Files, timeout } from './helpers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { runServer } from './examples/video';

//  new DataToSTDIO(),
const jobs: BaseExample[] = [
    new BasicObjectDataToFile(),
    new AsyncObjectDataToFile(),
    new AsyncObjectDataToCSV(),
    new SyncObjectDataToCSV(),
    new SyncObjectDataToCSVToZip(),
];

const go = async () => {
    Files.createTempDirIfNotExist();
    for (const job of jobs) {
        await job.run();
        await timeout(500);
    }
};

go();
