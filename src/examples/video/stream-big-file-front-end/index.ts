import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import express from 'express';
import axios from 'axios';

const runServer = async () => {
    const app = express();

    app.get('/', (req, res) => {
        const path = join(process.cwd(), 'assets', 'index.html');
        res.sendFile(path);
    });

    app.get('/video', async (req, res) => {
        const response = await axios.get(
            'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_2160p_60fps_normal.mp4',
            {
                responseType: 'stream',
            }
        );
        const { data: bunnyStream } = response;
        try{
            await pipeline(bunnyStream, res);
        } catch (error) {
            console.error(error);
        }
        
        console.log('DONE!');
    });

    app.listen(8000, () => {
        console.log('Listening on port http://localhost:8000 !');
    });

    return app;
};

runServer();

export { runServer };
