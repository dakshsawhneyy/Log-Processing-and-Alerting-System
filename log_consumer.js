const { kafka } = require('./kafka/client')

const { Pool } = require('pg')

// Setup PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: 'admin',
    port: 5432,
});

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

    // Insert into DB, if level is ERROR or CRITICAL
    try {
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
    } catch (error) {
        console.error('Error inserting log into database:', error.message)
        throw new Error('Database insertion failed')
    }
   
}

run_consumer()