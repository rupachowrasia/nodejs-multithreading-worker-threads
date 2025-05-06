import express from 'express';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);

app.get('/blocking', (req, res) => {
  // Simulate a blocking operation
  if(isMainThread) {
    
    let worker = new Worker(new URL('./worker.js', import.meta.url), { workerData: 'passed from parent' });

    worker.on('message', (message) => {
        console.log('Message from worker:', message);
        res.status(200).send(message);
    });
    worker.on('error', (error) => {
        console.error('Worker error:', error);
        res.status(500).send('Worker error');
    });
    worker.on('exit', (code) => {
        if (code !== 0)
          console.error(`Worker stopped with exit code ${code}`);
          res.status(500).send('Worker stopped with exit code');
    });

    // Messages sent from the parent thread using worker.postMessage() are available in worker using parentPort.on('message')
    worker.postMessage('Hello from main thread');
  }
});

app.get('/non-blocking', (req, res) => {   
    res.status(200).send('Non-blocking operation started');
});

app.listen(PORT, () => {    
  console.log(`Server is running on http://localhost:${PORT}`);
});