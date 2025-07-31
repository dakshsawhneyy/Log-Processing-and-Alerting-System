const { kafka } = require('./client')

async function init() {
    const admin = kafka.admin();

    console.log("Connecting Admin.......")
    await admin.connect();
    console.log("Connected to Admin 🎟️");

    // Creation of topic
    console.log("Creating topic [log-processing]....")
    await admin.createTopics({
        topics: [{
            topic: 'log-processing',
            numPartitions: 3    
        }]
    })
    console.log("Topic[log-processing] created successfully 🎫")

    // Disconnect Admin
    console.log("Disconnecting Admin.......")
    await admin.disconnect();
    console.log("Disconnected Admin 🏁")
}

init()