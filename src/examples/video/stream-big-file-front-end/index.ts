import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import express from 'express';

const runServer = async () => {
    const app = express();

    app.get('/', (req, res) => {
        const path = join(process.cwd(), 'assets', 'index.html');
        res.sendFile(path);
    });

    app.get('/video', (req, res) => {
        // We're looking for the range header "bytes=start-[end]"
        const range = req.headers?.range;
        if (!range) {
            res.status(400).send('Requires Range header');
            return;
        }
        const [, rangeExpression] = range.split('=', 2);
        const [startExpression, endExpression] = rangeExpression.split('-', 2);

        const start = Number(startExpression);
        const CHUNK_SIZE = 1e6;

        const videoPath = join(process.cwd(), 'assets', 'big-file.mp4');
        const videoSize = statSync(videoPath).size;
        // If browser does not state the end of the chunk we set it to 1000000 bytes
        const end = endExpression
            ? Number(endExpression)
            : Math.min(start + CHUNK_SIZE, videoSize - 1);

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
