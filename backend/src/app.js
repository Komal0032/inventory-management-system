const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const productRoutes = require("./routes/productRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reorderRoutes = require("./routes/reorderRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();


// CORS Configuration

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
];


app.use(
  cors({
    origin: function (origin, callback) {

      // Allow Postman/server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, true); // allow Railway deployment
    },
    credentials: true
  })
);


app.use(express.json());


// API Routes

app.use("/api/products", productRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/reorders", reorderRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/auth", authRoutes);


// React Frontend

const distPath = path.join(
  __dirname,
  "../../frontend/dist"
);


console.log(
  "React dist exists:",
  fs.existsSync(distPath)
);


app.use(express.static(distPath));


// React Router Support (Express 5 compatible)

app.get("/*", (req, res) => {

  const indexPath = path.join(
    distPath,
    "index.html"
  );

  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }

  res.send("Inventory Management API Running");

});


module.exports = app;