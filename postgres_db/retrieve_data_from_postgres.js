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
async function retrieve_data() {
    try {
        const result = await pool.query('SELECT * FROM logs')
        console.log(result.rows);     // returning all rows from logs table
    } catch (error) {
        console.error('Error retrieving data from database:', error.message)
        throw new Error('Database retrieval failed')
    }
}

retrieve_data()