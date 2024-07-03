const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/User');
const config = require('../config/environment');

async function login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password.toString(), user.password))) {
        return res.status(401).send('Authentication failed');
    }

    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
    res.json({ token });
}

async function register(req, res) {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
}

async function authenticateToken(req, res, next) {
    const token = req.headers['authorization'].split(' ');

    if (!token) return res.sendStatus(403);

    jwt.verify(token[1], config.jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = { login, register, authenticateToken };
