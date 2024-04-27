const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../config/database');

// Function to generate a random secret key
const generateSecretKey = () => {
    const secretKeyLength = 32; // You can adjust the length as needed
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let secretKey = '';
    for (let i = 0; i < secretKeyLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        secretKey += characters.charAt(randomIndex);
    }
    return secretKey;
};

// POST /login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        client.release();

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate a JWT token
        const secretKey = generateSecretKey();
        const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

        // Send the token in the response
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
