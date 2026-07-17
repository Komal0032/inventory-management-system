require("dotenv").config();


const http = require("http");

const app = require("./app");

const { initializeSocket } = require("./config/socket");

const pool = require("./config/db");


const PORT = process.env.PORT || 5000;


const server = http.createServer(app);


// Initialize Socket.IO

initializeSocket(server);


// Start Server

server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});


// Database Check

pool.query(
  "SELECT current_database(), current_schema();"
)
.then((result)=>{

  console.log(
    "Database Connected:",
    result.rows[0]
  );

})
.catch((error)=>{

  console.error(
    "Database Connection Error:",
    error.message
  );

});