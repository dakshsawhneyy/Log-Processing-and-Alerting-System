const { kafka } = require('./kafka/client')

const { Pool } = require('pg')  // using pool to make query into postgres

const pool = new Pool({     // Setup postgres connection
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: 'admin',
    port: 5432
})

// creating function that:  [this fxn is called in server.js when taking log data as input]
// -> takes log_message as input and sends it to kafka topic
async function sendLogToKafka(log_message){
    try {
        const producer = kafka.producer();

        console.log('Connecting producer .....')
        await producer.connect();
        console.log('Producer connected 🫠')

        // send the log_message to topic of kafka
        await producer.send({
            topic: 'log-processing',
            messages: [
                {
                    value: JSON.stringify(log_message)
                }
            ]
        })
        console.log('Message sent to topic [log-processing] successfully ')

        // Insert into DB, if level is ERROR or CRITICAL
        if (log_message['level'] == 'ERROR' || log_message['level'] == 'CRITICAL'){
            console.log('Inserting log into database ...');
            await pool.query(
                'INSERT INTO logs (created_at, level, message) VALUES ($1, $2, $3)',
                [log_message['timestamp'], log_message['level'], log_message['message']]
            )
            console.log('Log inserted into database successfully😈😈')
        }else{
            console.log('Log level is not ERROR or CRITICAL, skipping database insertion.')
        }
        
        // disconnect producer
        console.log('Disconnecting producer ....')
        await producer.disconnect();
        console.log('Producer disconnected 🏁')
    } catch (error) {
        console.error('Error inserting log into database:', error.message)
        throw new Error('Database insertion failed')
    }
}

module.exports = sendLogToKafka;