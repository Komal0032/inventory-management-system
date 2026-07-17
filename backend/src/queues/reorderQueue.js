const { Queue } = require("bullmq");
const redisConnection = require("../config/redis");


const reorderQueue = new Queue("reorder-process", {
    connection: redisConnection
});


module.exports = reorderQueue;