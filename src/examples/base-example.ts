abstract class BaseExample {
    abstract preRun(): Promise<void>;
    abstract example(): Promise<void>;
    async postRun(): Promise<void> {
        return;
    }

    public async run() {
        const LABEL = `Execution of: ${this.constructor.name} took`;
        console.log(`Started: ${this.constructor.name}`);
        await this.preRun();
        console.time(LABEL);
        await this.example();
        console.timeEnd(LABEL);
        await this.postRun();
        console.log(`Finished: ${this.constructor.name}\n`);
    }
}

export { BaseExample };
