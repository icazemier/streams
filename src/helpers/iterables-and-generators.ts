import { getRandomInt } from './randomness';
import { timeout } from './timers';
/**
 * Simulate a async data stream without having the whole array populated first.
 * Later we wrap it up in a generator to be used as Readable Stream
 */
const asyncIterable = (min: number, max: number, amount = 100) => {
    return {
        [Symbol.asyncIterator]() {
            let i = 0;
            return {
                next() {
                    // Prepare an object to be yielded
                    const value = {
                        id: i,
                        data: { name: 'Arnold Schwarzenegger' },
                        timestamp: new Date(),
                    };

                    if (i < amount) {
                        const randomTimeout = getRandomInt(min, max);
                        return timeout(randomTimeout).then(() => {
                            i++;
                            return Promise.resolve({ value, done: false });
                        });
                    }

                    return Promise.resolve({ value, done: true });
                },
            };
        },
    };
};

/**
 * Simulate a async data stream without having the whole array populated first.
 * Later we wrap it up in a generator to be used as Readable Stream
 */
const syncIterable = (amount = 100) => {
    return {
        [Symbol.iterator]() {
            let i = 0;
            return {
                next() {
                    // Prepare an object to be yielded
                    const value = {
                        id: i,
                        data: { name: 'Arnold Schwarzenegger' },
                        timestamp: new Date(),
                    };

                    if (i < amount) {
                        i++;
                        return { value, done: false };
                    }

                    return { value, done: true };
                },
            };
        },
    };
};

export { asyncIterable, syncIterable };
