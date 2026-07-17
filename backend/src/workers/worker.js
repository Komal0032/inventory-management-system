const { Worker } = require("bullmq");
const pool = require("../config/db");
const redisConnection = require("../config/redis");

const worker = new Worker(
    "reorder-process",
    async (job) => {

        const { reorderId } = job.data;

        console.log(`Supplier received reorder #${reorderId}`);

        // Wait 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Processing
        await pool.query(
            `
            UPDATE reorder_requests
            SET status = 'Processing'
            WHERE id = $1
            `,
            [reorderId]
        );

        console.log("Supplier Processing...");

        // Wait 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000));

        // 30% failure chance
        const failed = Math.random() < 0.3;

        if (failed) {
            throw new Error("Supplier service is temporarily unavailable.");
        }

        // Completed
        await pool.query(
            `
            UPDATE reorder_requests
            SET status = 'Completed'
            WHERE id = $1
            `,
            [reorderId]
        );

        console.log("Supplier Completed Order");

        return true;
    },
    {
        connection: redisConnection
    }
);

worker.on("completed", (job) => {
    console.log(`✅ Job ${job.id} completed successfully.`);
});

worker.on("failed", async (job, err) => {

    await pool.query(
        `
        UPDATE reorder_requests
        SET status = 'Failed'
        WHERE id = $1
        `,
        [job.data.reorderId]
    );

    console.log(`❌ Job ${job.id} failed: ${err.message}`);
});

console.log("🚀 BullMQ Worker Started...");