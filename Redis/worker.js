// This worker runs infinitely and if anything comes in queue, it starts processing it
const redis = require('./client')
const push_data_into_postgres = require('../postgres_db/push_data_into_postgres')

async function startWorker() {
    console.log('Worker Started....')

    // run infinitely
    while(true){
        try {
            // Check if there is any alert message in the queue
            const alert = await redis.rpop('alerts');   // from alert queue, rpop

            // If there is any message, send it to db
            if(alert){
                // Need to parse data, i.e. convert it from string to JSON
                const parsed_alert = JSON.parse(alert)
                console.log('Alert received:', parsed_alert)

                // Insert parsed alert into DB
                push_data_into_postgres(parsed_alert)

                console.log('Alert inserted into database successfully')
            }else{
                // If alert is not there, take a breath for 2 seconds, and again check for data
                await new Promise((res) => setTimeout(res, 1000))   // sleep for 1 second
            }

        } catch (error) {
            console.error('Error processing alert:', error.message)
        }
    }
}

startWorker()