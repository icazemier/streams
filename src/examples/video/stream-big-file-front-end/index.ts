import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import express from 'express';

// const runServer = async () => {

//   const server = createServer();
//   server.on("request", (req, res) => {
//     const path = join(process.cwd(),'assets','bigfile.MOV');
//     const src = createReadStream(path);
//     src.pipe(res);
//   });

//   server.listen(8000);
//   console.info('Listening on: http://localhost:8000')
//   return server;
// }

const runServer = async () => {
    const app = express();

    app.get('/', (req, res) => {
        const path = join(process.cwd(), 'assets', 'index.html');
        res.sendFile(path);
    });

    app.get('/video', (req, res) => {
        const range = req.headers.range;
        if (!range) {
            res.status(400).send('Requires Range header');
            return;
        }
        const videoPath = join(process.cwd(), 'assets', 'big-file.mp4');
        const videoSize = statSync(videoPath).size;
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ''));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${videoSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': 'video/mp4',
        };
        // HTTP Status 206 for Partial Content
        res.writeHead(206, headers);
        const videoStream = createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
    });

    app.listen(8000, () => {
        console.log('Listening on port http://localhost:8000 !');
    });
};

runServer();

export { runServer };
