const { Worker } = require("bullmq");
const pool = require("../config/db");
const redisConnection = require("../config/redis");


const worker = new Worker(
    "reorder-process",

    async (job) => {

        const { reorderId } = job.data;

        console.log(`📦 Supplier received reorder #${reorderId}`);


        // Supplier response delay
        await new Promise(resolve =>
            setTimeout(resolve, 2000)
        );


        // Update status
        await pool.query(
            `
            UPDATE reorder_requests
            SET status = 'Processing'
            WHERE id = $1
            `,
            [reorderId]
        );


        console.log(
            `⚙️ Reorder #${reorderId} Processing`
        );


        // Supplier processing time
        await new Promise(resolve =>
            setTimeout(resolve, 5000)
        );


        // Random failure simulation
        const failed = Math.random() < 0.3;


        if (failed) {

            await pool.query(
                `
                UPDATE reorder_requests
                SET status = 'Failed'
                WHERE id = $1
                `,
                [reorderId]
            );


            throw new Error(
                "Supplier service temporarily unavailable"
            );
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


        console.log(
            `✅ Reorder #${reorderId} Completed`
        );


        return {
            reorderId,
            status: "Completed"
        };

    },

    {
        connection: redisConnection,
        concurrency: 1
    }
);



worker.on("completed", (job, result) => {

    console.log(
        `✅ Job ${job.id} completed`,
        result
    );

});



worker.on("failed", (job, err) => {

    console.log(
        `❌ Job ${job.id} failed: ${err.message}`
    );

});



worker.on("error", (err) => {

    console.log(
        "❌ Worker Error:",
        err.message
    );

});


console.log("🚀 BullMQ Worker Started");


module.exports = worker;