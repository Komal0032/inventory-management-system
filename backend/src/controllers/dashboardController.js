const pool = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await pool.query(
      "SELECT COUNT(*) FROM products"
    );

    const totalReorders = await pool.query(
      "SELECT COUNT(*) FROM reorder_requests"
    );

    const lowStock = await pool.query(`
      SELECT COUNT(*)
      FROM products
      WHERE available_quantity < low_stock_threshold
    `);

    const inventoryValue = await pool.query(`
      SELECT SUM(available_quantity * cost_price)
      FROM products
    `);

    res.json({
      totalProducts: totalProducts.rows[0].count,
      totalReorders: totalReorders.rows[0].count,
      lowStockProducts: lowStock.rows[0].count,
      inventoryValue:
        inventoryValue.rows[0].sum || 0,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getRecentActivities = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT *
            FROM notifications
            ORDER BY created_at DESC
            LIMIT 10;
        `);

        res.json(result.rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
  getDashboardStats,
  getRecentActivities
};