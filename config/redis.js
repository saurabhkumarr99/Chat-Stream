const redis = require('redis');

// Create a Redis client
const client = redis.createClient();

// Handle Redis connection errors
client.on('error', (error) => {
    console.error('Error connecting to Redis:', error);
});

module.exports = client;
