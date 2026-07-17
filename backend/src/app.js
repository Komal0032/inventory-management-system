const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const dashboardRoutes =
require("./routes/dashboardRoutes");

const reorderRoutes = require("./routes/reorderRoutes");

const notificationRoutes = require("./routes/notificationRoutes");
const path = require("path");


const app = express();

// CORS configuration
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.send("Inventory API Running");
});

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/reorders", reorderRoutes);

app.use("/api/notifications", notificationRoutes);

// Serve React build files
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// React Router fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

module.exports = app;