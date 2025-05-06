import { parentPort, workerData } from 'worker_threads';

function computeHeavyTask(thread_count) {
    let sum = 0;
    for (let i = 0; i < 50000000000 / thread_count; i++) {
      sum += i;
    }
    return sum
}

const result = computeHeavyTask(workerData);
parentPort.postMessage(result);

