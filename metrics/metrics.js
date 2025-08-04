// prom-client is the official Prometheus library for Node.js.
const client = require('prom-client');

// Create a new metrics registry -- Prometheus pulls metrics from this registry
const register = new client.Registry();

// * Define Custom Counters -- counter can only go up
const totalLogsRecieved = new client.Counter({
    name: 'logs_total_recieved',
    help: 'Total number of logs received by the system',
})
const totalLogsStoredInRedis = new client.Counter({
    name: 'logs_total_stored_in_redis',
    help: 'Total number of logs stored in Redis',
})
const totalLogsStoredInDB = new client.Counter({
    name: 'logs_total_stored_in_db',
    help: 'Total number of logs stored in PostgreSQL database',
})
const totalLogsRejected = new client.Counter({
    name: 'logs_total_rejected',
    help: 'Total number of logs rejected due to level not being ERROR or CRITICAL',
})

//* Register them to Prometheus registry
register.registerMetric(totalLogsRecieved);
register.registerMetric(totalLogsStoredInRedis);
register.registerMetric(totalLogsStoredInDB);
register.registerMetric(totalLogsRejected);

// Enable Default NodeJS Metrics
client.collectDefaultMetrics({ register })  // also get system level metrics like CPU, memory and all

// Export Them
module.exports = {
    totalLogsRecieved,
    totalLogsRejected,
    totalLogsStoredInDB,
    totalLogsStoredInRedis,
    register
}