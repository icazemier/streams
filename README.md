

# Streams ROADMAP

## Done
1. Pre crafted collection of objects (in RAM) =>
    1. Transform =>
    1. store in file **[end]**
1. Async Iterator crafted objects (simulated external stream) =>
    1. Transform =>
    1. store in file **[end]**
1. Async Iterator crafted objects (simulated external stream) =>
    1. Transform data (prepare for CSV format) => 
    1. Transform to CSV =>
    1. store in file **[end]**
1. Sync Iterator crafted objects (Speed demo up) =>
    1. Transform data (prepare for CSV format) =>
    1. Transform to CSV =>
    1. store in file **[end]**
1. Sync Iterator crafted objects (Speed demo up) =>
    1. Transform data (prepare for CSV format) =>
    1. Transform to CSV =>
    1. Compress GZip =>
    1. store in file **[end]**
## TODO ?
1. Real basics of Streams
    1. listeners
    1. back pressure thingies
    1. memory / cpu etc...
1. What not to do!
    1. buffer files completely in RAM, then store!
    1. write to local temp file (often slow, and solvable by implementing streams api)
    1. Prepare big chunks of collections in ram (use iterators pl0s)

1. From MongoDB Stream (simple find) => stuff
1. From MongoDB Stream (aggregations) => stuff
1. From SQL ;) => stuff
1. Something with encryption
1. Arnold Generator
1. Imagary/Video streaming to front end
1. UDP stream (imagery / data)
1. Maybe incorporating socket.io
## How to: Unit test streams
1. Intercept traffic in a stream
1. Simulate/TEST an error somewhere inside the stream@example``````

## Profile

(See: https://clinicjs.org/)

1.  npm i -g clinic`
1. `clinic doctor -- node ./dist/index.js`
# Sources

- https://blog.risingstack.com/the-definitive-guide-to-object-streams-in-node-js/
- https://nodejs.dev/en/learn/nodejs-streams/#how-to-create-a-readable-stream
- https://jscomplete.com/learn/node-beyond-basics/node-streams
- https://nodejs.org/api/process.html#processstdout (about blocking the event loop)
- https://thenewstack.io/node-js-readable-streams-explained/
- https://www.knowledgehut.com/blog/web-development/compression-decompression-of-data-using-zlib-in-Nodejs
- https://medium.com/@hemitrana1409/node-js-zlib-module-a6c2d8b9c195