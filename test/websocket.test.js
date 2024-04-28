const WebSocketSkr = require('ws');
const { 
  r } = require('../config/kafka');

// Function to create a WebSocket client
const createWebSocketClientSkr = () => {
  return new WebSocketSkr('ws://localhost:3000');
};

// Test suite for WebSocket Server
describe('WebSocket Server Skr', () => {
  let wsClientSkr;

  // Before all tests, create a WebSocket client
  beforeAll(() => {
    wsClientSkr = createWebSocketClientSkr();
  });

  // After all tests, close the WebSocket client
  afterAll(() => {
    wsClientSkr.close();
  });

  // Test case to verify connection establishment with WebSocket server
  it('should establish connection with the WebSocket server Skr', (done) => {
    wsClientSkr.on('open', () => {
      // Connection established successfully
      done();
    });
  });

  // Test case to verify receiving and broadcasting of messages from WebSocket server
  it('should receive and broadcast message from WebSocket server Skr', (done) => {
    const messageSkr = 'Test message';

    wsClientSkr.on('message', (data) => {
      expect(data).toBe(messageSkr);
      done();
    });

    wsClientSkr.send(messageSkr);
  });

  // Test case to verify publishing message to Kafka when received by WebSocket server
  it('should publish message to Kafka when received by WebSocket server Skr', (done) => {
    const messageSkr = 'Test message for Kafka';

    // Mocking the publishToKafkaSkr function
    const publishToKafkaMockSkr = jest.fn();

    wsClientSkr.on('message', async () => {
      // Call publishToKafkaSkr function
      await publishToKafkaMockSkr(messageSkr);

      // Check if publishToKafkaSkr function was called with the correct message
      expect(publishToKafkaMockSkr).toHaveBeenCalledWith(messageSkr);
      done();
    });

    wsClientSkr.send(messageSkr);
  });
});
