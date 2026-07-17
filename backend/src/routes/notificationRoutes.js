const express = require("express");
const router = express.Router();

const {
  getNotifications,
  markAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

// GET /api/notifications
router.get("/", getNotifications);

// PATCH /api/notifications/:id/read
router.patch("/:id/read", markAsRead);

// DELETE /api/notifications/:id
router.delete("/:id", deleteNotification);

module.exports = router;