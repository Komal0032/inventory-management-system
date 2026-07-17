const notificationService = require("../services/notificationService");


const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getNotifications();

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notification = await notificationService.markAsRead(req.params.id);

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteNotification = async (req, res) => {

  try {

    const notification =
      await notificationService.deleteNotification(req.params.id);

    if (!notification) {

      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  getNotifications,
  markAsRead,
  deleteNotification,
};