require('dotenv').config();

// values can be used from environment variables while production
module.exports = {
    port: process.env.PORT || 8080,
    mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Queue_System',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret', // you can add the env file using the environment
};
