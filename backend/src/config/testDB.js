const pool = require("./db");

async function testDatabase() {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("Database Connected Successfully");
        console.log(result.rows);
    } catch (error) {
        console.log("Database Connection Failed");
        console.log(error.message);
    } finally {
        pool.end();
    }
}

testDatabase();