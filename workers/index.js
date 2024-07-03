const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient();
const rpopAsync = promisify(client.rpop).bind(client);

async function startWorker(queueName) {
    while (true) {
        const request = await rpopAsync(queueName);
        if (request) {
            const parsedRequest = JSON.parse(request);
            // Process the request
            console.log(`Processing request: ${parsedRequest}`);
            // Simulate processing
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } else {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before trying again
        }
    }
}

const queueName = process.argv[2];
startWorker(queueName);
