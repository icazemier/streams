import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export class Files {
    public static readonly TEMP_DIR = join(process.cwd(), 'temp');
    public static createTempDirIfNotExist(dir = Files.TEMP_DIR) {
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }
    }
}
