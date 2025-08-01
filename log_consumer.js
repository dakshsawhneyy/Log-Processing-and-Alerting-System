const { kafka } = require('./kafka/client')

async function run_consumer(){
    const consumer = kafka.consumer({groupId: 'log-group'});

    console.log("Connecting Consumer.......");
    await consumer.connect();
    console.log("Connected to Consumer 🎟️");

    await consumer.subscribe({ topics: ['log-processing'], fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const log = JSON.parse(message.value.toString())    // parsing message and converting it to string
            console.log('Recieved LOG', log)
        }
    })
}

run_consumer()