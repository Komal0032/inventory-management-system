const Redis = require("ioredis");

const redisConnection = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,

    // Required for BullMQ
    maxRetriesPerRequest: null
});

redisConnection.on("connect", () => {
    console.log("✅ Redis Connected");
});

redisConnection.on("error", (err) => {
    console.log("❌ Redis Error:", err.message);
});

module.exports = redisConnection;