const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const pool = require('../config/database'); 

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if username, email, or password is missing
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Insert the user into the database with the hashed password
        const client = await pool.connect();
        const result = await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
        const newUser = result.rows[0];
        client.release();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Internal Server Error' });
    }
});


router.delete('/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM users WHERE username = $1 RETURNING *', [username]);
        const deletedUser = result.rows[0];
        client.release();

        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /users
router.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users');
        const users = result.rows;
        client.release();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
