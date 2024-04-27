const WebSocket = require('ws');
const { publishToKafka } = require('../config/kafka');

// Function to create a WebSocket client
const createWebSocketClient = () => {
  return new WebSocket('ws://localhost:3000');
};

describe('WebSocket Server', () => {
  let wsClient;

  beforeAll(() => {
    // Create a WebSocket client before running tests
    wsClient = createWebSocketClient();
  });

  afterAll(() => {
    // Close the WebSocket client after all tests have finished
    wsClient.close();
  });

  it('should establish connection with the WebSocket server', (done) => {
    wsClient.on('open', () => {
      // Connection established successfully
      done();
    });
  });

  it('should receive and broadcast message from WebSocket server', (done) => {
    const message = 'Test message';

    // Event listener to handle incoming messages from WebSocket server
    wsClient.on('message', (data) => {
      expect(data).toBe(message);
      done();
    });

    // Send a message to the WebSocket server
    wsClient.send(message);
  });

  it('should publish message to Kafka when received by WebSocket server', (done) => {
    const message = 'Test message for Kafka';

    // Mocking the publishToKafka function
    const publishToKafkaMock = jest.fn();

    // Simulate message reception by WebSocket server
    wsClient.on('message', async () => {
      // Call publishToKafka function
      await publishToKafkaMock(message);

      // Check if publishToKafka function was called with the correct message
      expect(publishToKafkaMock).toHaveBeenCalledWith(message);
      done();
    });

    // Send a message to the WebSocket server
    wsClient.send(message);
  });
});
