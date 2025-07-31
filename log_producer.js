const { kafka } = require('./kafka/client')

// creating function that:  [this fxn is called in server.js when taking log data as input]
// -> takes log_message as input and sends it to kafka topic
async function sendLogToKafka(log_message){
    const producer = kafka.producer();

    console.log('Connecting producer .....')
    await producer.connect();
    console.log('Producer connected 🫠')

    // send the log_message to topic of kafka
    producer.send({
        topic: 'log-processing',
        messages: [
            {
                value: JSON.stringify(log_message)
            }
        ]
    })
    console.log('Message sent to topic [log-processing] successfully ')

    // disconnect producer
    console.log('Disconnecting producer ....')
    await producer.disconnect();
    console.log('Producer disconnected 🏁')
}

module.exports = sendLogToKafka;