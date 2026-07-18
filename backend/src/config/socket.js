let io;

const initializeSocket = (server) => {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: [
        "https://inventory-management-system-qlk21f3ef.vercel.app"
      ],
      methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
      ]
    }
  });

  io.on("connection", (socket) => {
    console.log("Admin Connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Admin Disconnected:", socket.id);
    });
  });

  return io;
};


const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }

  return io;
};


module.exports = {
  initializeSocket,
  getIO
};