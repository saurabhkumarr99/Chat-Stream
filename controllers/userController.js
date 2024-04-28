const expressSkr = require('express');  // Import the Express framework
const routerSkr = expressSkr.Router();  // Create a router object to manage routes
const bcryptSkr = require('bcrypt');  // Import the bcrypt library for password hashing

const poolSkr = require('../config/database');  // Import the database pool configuration

// POST /register to handle user registrations
routerSkr.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if username, email, or password is missing
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    try {
        // Hash the password using bcrypt with 10 salt rounds
        const hashedPasswordSkr = await bcryptSkr.hash(password, 10);

        // Insert the new user into the database with the hashed password
        const clientSkr = await poolSkr.connect();
        const resultSkr = await clientSkr.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPasswordSkr]);
        const newUserSkr = resultSkr.rows[0];
        clientSkr.release();
        res.status(201).json(newUserSkr);
    } catch (errorSkr) {
        console.error(errorSkr);
        res.status(400).json({ error: 'Internal Server Error' });
    }
});

// DELETE /:username to delete a user by username
routerSkr.delete('/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const clientSkr = await poolSkr.connect();
        const resultSkr = await clientSkr.query('DELETE FROM users WHERE username = $1 RETURNING *', [username]);
        const deletedUserSkr = resultSkr.rows[0];
        clientSkr.release();

        if (deletedUserSkr) {
            res.status(200).json({ message: 'User deleted successfully', user: deletedUserSkr });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (errorSkr) {
        console.error(errorSkr);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /users to retrieve all users
routerSkr.get('/', async (req, res) => {
    try {
        const clientSkr = await poolSkr.connect();
        const resultSkr = await clientSkr.query('SELECT * FROM users');
        const usersSkr = resultSkr.rows;
        clientSkr.release();
        res.status(200).json(usersSkr);
    } catch (errorSkr) {
        console.error(errorSkr);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = routerSkr;  // Export the router for use in other parts of the application
