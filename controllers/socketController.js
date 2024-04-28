const WebSocketSktr = require('ws'); // Import the WebSocket library
const poolSktr = require('../config/database'); // Import the database connection pool
const { publishToKafkaSkr } = require('../config/kafka'); // Import the publish to Kafka function

// Initialize a WebSocket Server instance without an HTTP server
const wssSktr = new WebSocketSktr.Server({ noServer: true });

// Event listener for client connections to the WebSocket server
wssSktr.on('connection', function connectionSktr(wsSktr) {
    console.log('A new client connected!');

    // Event listener for receiving messages from clients
    wsSktr.on('message', async function incomingSktr(messageSktr) {
        console.log('received: %s', messageSktr);

        // Broadcast the incoming message to all connected clients except the sender
        wssSktr.clients.forEach(function eachSktr(clientSktr) {
            if (clientSktr !== wsSktr && clientSktr.readyState === WebSocketSktr.OPEN) {
                clientSktr.send(messageSktr);
            }
        });

        // Store the message in the database
        try {
            const clientDbSktr = await poolSktr.connect(); // Connect to the database
            const resultSktr = await clientDbSktr.query('INSERT INTO messages (message) VALUES ($1) RETURNING *', [messageSktr]); // Insert message into the database
            const newMessageSktr = resultSktr.rows[0]; // Retrieve the inserted message from the result
            clientDbSktr.release(); // Release the database connection
            console.log('Message stored in the database:', newMessageSktr);
        } catch (errorSktr) {
            console.error('Error storing message in the database:', errorSktr);
        }

        // Publish the message to a Kafka topic
        await publishToKafkaSkr(messageSktr);
    });

    // Event listener for client disconnections
    wsSktr.on('close', () => {
        console.log('Client has disconnected');
    });
});

module.exports = wssSktr; // Export the WebSocket server for use elsewhere in the application
