const { Kafka } = require('kafkajs'); // Import Kafka client from the kafkajs library

// Initialize Kafka producer with the specified client ID and brokers
const kafkaSkr = new Kafka({
  clientId: 'my-app', // Client identifier
  brokers: ['localhost:9092'] // Array of Kafka broker addresses
});

const producerSkr = kafkaSkr.producer(); // Create a producer instance from the Kafka configuration

// Connect to the Kafka broker asynchronously
async function connectKafkaSkr() {
  await producerSkr.connect(); // Establish a connection to the Kafka broker
  console.log('Connected to Kafka');
}

// Function to publish messages to a Kafka topic
async function publishToKafkaSkr(message) {
  try {
    await producerSkr.send({
      topic: 'chat-messages', // The Kafka topic where messages will be published
      messages: [{ value: message }] // An array of messages to be sent
    });
    console.log('Message published to Kafka:', message); // Log success message
  } catch (error) {
    console.error('Error publishing message to Kafka:', error); // Log any errors encountered
  }
}

// Export functions for use in other parts of the application
module.exports = { connectKafkaSkr, publishToKafkaSkr };
