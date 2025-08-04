const express = require('express');
const sendLogToKafka = require('./log_producer');
const { register } = require('prom-client');

const app = express();

// middleware to parse JSON from incoming requests
app.use(express.json())     // without this body will be undefined {}

// node js handles /log request
// this recieves the data from api parses it and send it to kafka, acts as middleware
app.use('/log', async(req,res) => {    // this middleware parses incoming JSON into req.body
    const logData = req.body;
    try {
        await sendLogToKafka(logData);
        res.status(200).json({message: 'Log data sent to Kafka successfully', data: logData});
    } catch (error) {
        console.error('Error sending log data to Kafka:', error);
        res.status(500).json({message: 'Failed to send log data to Kafka'});
    }
})

// Adding prom-client 
app.use('/metrics', async(req,res) => {
    try {
        // this is the format that prometheus understands
        res.set('Content-Type', register.contentType);   // thats how prometheus expects data to recieve data
        res.end(await register.contentType);   // sends that data as a final response to Prometheus
    } catch (error) {
        console.error('Error fetching metrics:', error);
        res.status(500).json({message: 'Failed to fetch metrics'});
    }
})

app.listen(9000, () => {
    console.log('Listening on PORT 9000')
})