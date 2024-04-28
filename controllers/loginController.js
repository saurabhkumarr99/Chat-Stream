const redisSkr = require('../config/redis'); // Import the Redis client library
const expressSkr = require('express'); // Load the Express module for routing
const jwtSkr = require('jsonwebtoken'); // Load the jsonwebtoken module for JWT operations
const bcryptSkr = require('bcrypt'); // Load the bcrypt module for password hashing
const routerSkr = expressSkr.Router(); // Create a new Router object
const poolSkr = require('../config/database'); // Load the database configuration

// Create a Redis client using default settings
const clientSkr = redisSkr.createClient();

// Set up an event listener to handle errors that occur when connecting to the Redis server
clientSkr.on('error', (error) => {
    console.error('Error connecting to Redis:', error); // Log any connection errors
});

// Function to generate a random secret key for JWT signing
const generateSecretKeySkr = () => {
    const secretKeyLengthSkr = 32; // Define the desired length of the secret key
    const charactersSkr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Allowed characters in the key
    let secretKeySkr = ''; // Initialize the secret key as an empty string
    for (let iSkr = 0; iSkr < secretKeyLengthSkr; iSkr++) {
        const randomIndexSkr = Math.floor(Math.random() * charactersSkr.length); // Generate a random index based on character length
        secretKeySkr += charactersSkr.charAt(randomIndexSkr); // Append the character at the random index to the secret key
    }
    return secretKeySkr; // Return the generated secret key
};

// POST /login - Endpoint to handle user login
routerSkr.post('/login', async (reqSkr, resSkr) => {
    const { email, password } = reqSkr.body; // Destructure email and password from request body

    try {
        const clientSkr = await poolSkr.connect(); // Connect to the database
        const resultSkr = await clientSkr.query('SELECT * FROM users WHERE email = $1', [email]); // Query the database for the user by email
        const userSkr = resultSkr.rows[0]; // Retrieve the first row from the results

        clientSkr.release(); // Release the database connection

        if (!userSkr) {
            return resSkr.status(401).json({ error: 'Invalid email or password' }); // If no user is found, return an error
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatchSkr = await bcryptSkr.compare(password, userSkr.password);

        if (!passwordMatchSkr) {
            return resSkr.status(401).json({ error: 'Invalid email or password' }); // If passwords do not match, return an error
        }

        // Store login information in Redis
        clientSkr.set(email, userSkr.id);

        // Generate a JWT token using the secret key
        const secretKeySkr = generateSecretKeySkr();
        const tokenSkr = jwtSkr.sign({ userId: userSkr.id, email: userSkr.email }, secretKeySkr, { expiresIn: '1h' });

        // Send the token in the response
        resSkr.status(200).json({ message: 'Login successful', token: tokenSkr });
    } catch (errorSkr) {
        console.error(errorSkr);
        resSkr.status(500).json({ error: 'Internal Server Error' }); // Handle any other errors
    }
});

module.exports = routerSkr; // Export the router for use in the main application file
