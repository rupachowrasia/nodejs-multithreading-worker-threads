import express from 'express';
import { Worker } from 'worker_threads';

const app = express();
const PORT = process.env.PORT || 3000;
const THREAD_COUNT = 4

function workerFunction() {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./four-worker.js', import.meta.url), { workerData: THREAD_COUNT });
    
    worker.on('message', (message) => {
        console.log('Message from worker:', message);
        resolve(message);
    });

    worker.on('error', (error) => {
        console.error('Worker error:', error);
        reject('Worker error');
    });

    worker.on('exit', (code) => {
        if (code !== 0)
          console.error(`Worker stopped with exit code ${code}`);
          reject('Worker stopped with exit code');
    });
  });
}   

app.get('/blocking', async(req, res) => {

   const workerPromise = [];
    for (let i = 0; i < THREAD_COUNT; i++) {
         workerPromise.push(workerFunction());
    }
    const result = await Promise.all(workerPromise);
    const total = result.reduce((acc, val) => acc + val, 0);
    console.log('Total from all workers:', total);
    res.status(200).send(`Blocking operation completed. Total: ${total}`);

});

app.get('/non-blocking', (req, res) => {   
    res.status(200).send('Non-blocking operation started');
});

app.listen(PORT, () => {    
  console.log(`Server is running on http://localhost:${PORT}`);
});