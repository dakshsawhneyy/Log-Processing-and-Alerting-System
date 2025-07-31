const express = require('express')

const app = express()

app.use('/log', (req, res) => {
    
})

app.listen(9000, () => {
    console.log('Listening on PORT 9000')
})