const Redis = require("ioredis");
require("dotenv").config();

const redisConnection = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,

    // keep connection alive
    keepAlive: 30000,

    // retry connection after failure
    retryStrategy(times) {
        return Math.min(times * 1000, 5000);
    }
});


redisConnection.once("ready", () => {
    console.log("✅ Redis Connected");
});


redisConnection.on("error", (err) => {
    console.log("❌ Redis Error:", err.message);
});


module.exports = redisConnection;