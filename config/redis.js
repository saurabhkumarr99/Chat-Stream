const redis = require('redis'); // Import the Redis client library

// Create a Redis client using default settings
const clientSkr = redis.createClient();

// Set up an event listener to handle errors that occur when connecting to the Redis server
clientSkr.on('error', (error) => {
    console.error('Error connecting to Redis:', error); // Log any connection errors
});

// Export the Redis client so it can be used in other parts of the application
module.exports = clientSkr;
