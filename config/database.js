const { Pool } = require('pg'); // Import the Pool class from the pg (PostgreSQL) library

// Create a new instance of Pool which will configure your PostgreSQL connection
const pool = new Pool({
    user: 'postgres', // Username to connect to the PostgreSQL server
    host: 'localhost', // Server address where PostgreSQL is running
    database: 'Chat-stream', // Database name to connect to
    password: 'admin', // Password for the user accessing the database
    port: 5432, // Port number where PostgreSQL is listening for connections
});

module.exports = pool; // Export the pool instance to use it in other parts of your application
