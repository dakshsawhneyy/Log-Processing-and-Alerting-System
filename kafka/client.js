const { Kafka } = require('kafkajs')

// Creaing Kafka Client
exports.kafka = new Kafka({
    clientId: 'my-app',
    brokers: ["localhost:9092"]
})