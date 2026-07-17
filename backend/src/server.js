const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./config/socket");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

const pool = require("./config/db");

pool.query("SELECT current_database(), current_schema();")
  .then((result) => {
    console.log(result.rows);
  })
  .catch(console.error);

  

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});