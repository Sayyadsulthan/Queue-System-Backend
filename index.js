const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { authenticateToken, login, register } = require('./auth');
const { createQueue, enqueueRequest } = require('./queue');
const config = require('./config/environment');

const port = config.port;
const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

mongoose.connect(config.mongoURI).then(() => console.log('connected to db'));

app.post('/user/login', login);
app.post('/user/register', register);

app.post('/enqueue', authenticateToken, async (req, res) => {
    const { userId, request } = req.body;
    const queueName = await createQueue(userId);
    await enqueueRequest(queueName, request);
    res.status(200).send('Request enqueued');
});

app.listen(port, () => {
    console.log('Server running on port: ', port);
});
