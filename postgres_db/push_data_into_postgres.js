const { Pool } = require('pg')

const pool = new Pool({
    // Setup PostgreSQL connection
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: 'admin',
    port: 5432,
})

// Creating function to retieve data from postgres
async function push_data_into_postgres(log_message) {
    try {
        const result = await pool.query(
            'INSERT INTO logs (created_at, level, message) VALUES($1, $2, $2)',
            [log_message['timestamp'], log_message['level'], log_message['message']]
        )
        console.log('Data inserted successfully:', result.rowCount)
    } catch (error) {
        console.error('Error retrieving data from database:', error.message)
        throw new Error('Database retrieval failed')
    }
}

module.exports = push_data_into_postgres