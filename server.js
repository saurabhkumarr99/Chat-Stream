const expressSkr = require('express');
const bodyParserSkr = require('body-parser');
const userRouterSkr = require('./controllers/userController');
const loginRouterSkr = require('./controllers/loginController');
const socketControllerSkr = require('./controllers/socketController'); 

// Initialize a basic express server
const appSkr = expressSkr();

appSkr.use(bodyParserSkr.urlencoded({ extended: false }));
appSkr.use(bodyParserSkr.json());

// Use user and task routes
appSkr.use('/api/users', userRouterSkr);
appSkr.use('/api', loginRouterSkr);

// Upgrade HTTP server to handle WebSocket connections
const serverSkr = appSkr.listen(process.env.PORT || 3000, function() {
    console.log(`Server is listening on http://localhost:${serverSkr.address().port}`);
});


// Attach WebSocket server to the HTTP server
serverSkr.on('upgrade', function upgrade(request, socket, head) {
    socketControllerSkr.handleUpgrade(request, socket, head, function done(ws) {
        socketControllerSkr.emit('connection', ws, request);
    });
});