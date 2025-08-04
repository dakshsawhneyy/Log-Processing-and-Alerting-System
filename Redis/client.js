const IORedis = require('ioredis')

const redis = new IORedis({     // creating connection of redis
    host: 'localhost',
    port: 6379,
    maxRetriesPerRequest: null, // No limit on retries
})

module.exports = redis;