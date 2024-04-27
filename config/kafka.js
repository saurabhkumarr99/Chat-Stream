const { Kafka } = require('kafkajs');

// Initialize Kafka producer
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'] // Kafka broker address
});

const producer = kafka.producer();

// Connect to Kafka broker
async function connectKafka() {
  await producer.connect();
  console.log('Connected to Kafka');
}

// Publish message to Kafka topic
async function publishToKafka(message) {
  try {
    await producer.send({
      topic: 'chat-messages', // Kafka topic to publish to
      messages: [{ value: message }]
    });
    console.log('Message published to Kafka:', message);
  } catch (error) {
    console.error('Error publishing message to Kafka:', error);
  }
}

module.exports = { connectKafka, publishToKafka };
