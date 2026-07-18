const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


pool.on("connect", () => {
    console.log("✅ PostgreSQL Pool Connected");
});


pool.on("error", (err) => {
    console.log("❌ PostgreSQL Pool Error:", err.message);
});


module.exports = pool;