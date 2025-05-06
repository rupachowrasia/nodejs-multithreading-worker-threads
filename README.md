# Multithreading in node.js with Worker Thread
> Node.js is single-threaded by default (everything runs on the main thread), which is great for I/O tasks but bad for heavy computation (e.g., image processing, encryption, parsing large files). To offload heavy computational task we use 
Worker Threads in node.js.

## 🚀 Features

- A Worker Thread is a way to run JavaScript in parallel on multiple threads (useful for CPU-heavy tasks).
- They share memory, but don’t spawn new processes.
- Ideal for CPU-bound tasks (math, compression, etc.) — not I/O-heavy work.
- API:
    - Run check: isMainThread
    - Send/Receive: parentPort.postMessage(), .on()
    - Input data:	workerData
    - File path: Use new URL('./worker.js', import.meta.url) in ESM

## 🛠 Tech Stack

- Node.js 
- Express
- Node.js worker-thread module


## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/rupachowrasia/nodejs-multithreading-worker-threads.git

# Move into the project directory
cd nodejs-multithreading-worker-threads

# Install dependencies
npm install

# Run the app
npm run start
