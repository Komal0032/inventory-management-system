const pool = require("../config/db");

// Save notification
const createNotification = async (title, message) => {

  const query = `
    INSERT INTO notifications (title, message)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const result = await pool.query(query, [title, message]);

  return result.rows[0];
};

// Get all notifications
const getNotifications = async () => {

  const query = `
    SELECT *
    FROM notifications
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(query);

  return result.rows;
};

// Mark notification as read
const markAsRead = async (id) => {

  const query = `
    UPDATE notifications
    SET is_read = TRUE
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

// Delete notification
const deleteNotification = async (id) => {

  const query = `
    DELETE FROM notifications
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
};