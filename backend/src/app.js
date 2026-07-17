const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const dashboardRoutes =
require("./routes/dashboardRoutes");

const reorderRoutes = require("./routes/reorderRoutes");

const notificationRoutes = require("./routes/notificationRoutes");
const path = require("path");
const authRoutes = require("./routes/authRoutes");


const app = express();

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://inventory-management-system-production-5ffc.up.railway.app"
  ],
  credentials: true
}));
app.use(express.json());

app.use("/api/products", productRoutes);

//app.get("/", (req, res) => {
   // res.send("Inventory API Running");
//});

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/reorders", reorderRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/auth", authRoutes);

const fs = require("fs");

const distPath = path.join(__dirname, "../../frontend/dist");
console.log("React dist exists:", fs.existsSync(distPath));
console.log("React index exists:", fs.existsSync(path.join(distPath, "index.html")));

// Serve React build files
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// React Router fallback
app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

module.exports = app;