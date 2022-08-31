import { getRandomInt } from './randomness.js';
import { timeout } from './timers.js';

/**
 * Simulate a async data stream without having the whole array populated first.
 * It returns an object on demand, but with a random timeout
 */
async function* asyncGenerator(min: number, max: number, amount = 100) {
    for (let i = 0; i < amount; i++) {
        // Prepare an object to be yielded
        const value = {
            id: i,
            data: { name: 'Arnold Schwarzenegger' },
            timestamp: new Date(),
        };
        // Wait for a bit
        await timeout(getRandomInt(min, max));
        yield value;
    }
}

/**
 * Simulate a sync data stream without having the whole array populated first.
 * It returns an object on demand, this time synchronously
 */
function* syncGenerator(amount = 100) {
    for (let i = 0; i < amount; i++) {
        // Prepare an object to be yielded
        const value = {
            id: i,
            data: { name: 'Arnold Schwarzenegger' },
            timestamp: new Date(),
        };
        yield value;
    }
}

export { asyncGenerator, syncGenerator };
