const Redis = require("ioredis");
require("dotenv").config();

const redisConnection = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
});

redisConnection.on("connect", () => {
    console.log("✅ Redis Connected");
});

redisConnection.on("error", (err) => {
    console.log("❌ Redis Error:", err.message);
});

module.exports = redisConnection;