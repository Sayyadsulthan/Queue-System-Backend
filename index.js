const expres = require('express');
require('dotenv').config();
const port = process.env.PORT;
const app = expres();

app.use(expres.json());

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome to Queue System' });
});

app.listen(port, () => console.log('server is running on port: ', port));
