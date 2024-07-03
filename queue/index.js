const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();
const lpushAsync = promisify(client.lPush).bind(client);
const rpopAsync = promisify(client.rPop).bind(client);

async function createQueue(userId) {
    const queueName = `queue_${userId}`;
    return queueName;
}

async function enqueueRequest(queueName, request) {
    await lpushAsync(queueName, JSON.stringify(request));
}

async function dequeueRequest(queueName) {
    const request = await rpopAsync(queueName);
    return JSON.parse(request);
}

module.exports = { createQueue, enqueueRequest, dequeueRequest };
