const WebSocket = require('ws');
const pool = require('../config/database');
const { publishToKafka } = require('../config/kafka');

// Initialize a WebSocket Server instance
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', function connection(ws) {
    console.log('A new client connected!');

    ws.on('message', async function incoming(message) {
        console.log('received: %s', message);

        // Broadcast incoming message to all clients
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });

        // Store the message in the database
        try {
            const client = await pool.connect();
            const result = await client.query('INSERT INTO messages (message) VALUES ($1) RETURNING *', [message]);
            const newMessage = result.rows[0];
            client.release();
            console.log('Message stored in the database:', newMessage);

        } catch (error) {
            console.error('Error storing message in the database:', error);
        }

        // Publish message to Kafka
        await publishToKafka(message);
    });

    ws.on('close', () => {
        console.log('Client has disconnected');
    });
});

module.exports = wss;
