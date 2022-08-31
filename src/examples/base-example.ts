import { logger } from '../helpers/index.js';
import { performance } from 'perf_hooks';
import prettyMilliseconds from 'pretty-ms';
class BaseExample {
    async preRun(): Promise<void> {
        return;
    }
    async example(): Promise<void> {
        return;
    }
    async postRun(): Promise<void> {
        return;
    }

    public async run() {
        logger.info(`Started: ${this.constructor.name}`);
        await this.preRun();
        performance.mark('example-start');
        await this.example();
        performance.mark('example-end');
        await this.postRun();
        const { duration } = performance.measure(
            'example',
            'example-start',
            'example-end'
        );

        logger.info(
            `Execution of: ${this.constructor.name} took: ${prettyMilliseconds(
                duration
            )}`
        );
        logger.info(`Finished: ${this.constructor.name}\n`);
    }
}
export { BaseExample };
