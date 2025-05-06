import { parentPort, workerData } from 'worker_threads';

function computeHeavyTask(data) {
    let sum = 0;
    for (let i = 0; i < 50000000000; i++) {
      sum += i;
    }
    return { sum, from: data };
}

const result = computeHeavyTask(workerData);
// Messages sent using parentPort.postMessage() are available in the parent thread using worker.on('message')
parentPort.postMessage(result);


parentPort.on('message', (message) => {
    console.log('Message:', message);
});