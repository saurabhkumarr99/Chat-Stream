const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./controllers/userController');
const loginRouter = require('./controllers/loginController');
const socketController = require('./controllers/socketController'); // Import the socket controller

// Initialize a basic express server
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Use user and task routes
app.use('/api/users', userRouter);
app.use('/api', loginRouter);

// Upgrade HTTP server to handle WebSocket connections
const server = app.listen(process.env.PORT || 3000, function() {
    console.log(`Server is listening on http://localhost:${server.address().port}`);
});

// Attach WebSocket server to the HTTP server
server.on('upgrade', function upgrade(request, socket, head) {
    socketController.handleUpgrade(request, socket, head, function done(ws) {
        socketController.emit('connection', ws, request);
    });
});
