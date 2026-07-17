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


    // Reorder status counts
    const pendingReorders = await pool.query(`
      SELECT COUNT(*)
      FROM reorder_requests
      WHERE status = 'Pending'
    `);


    const completedReorders = await pool.query(`
      SELECT COUNT(*)
      FROM reorder_requests
      WHERE status = 'Completed'
    `);


    const failedReorders = await pool.query(`
      SELECT COUNT(*)
      FROM reorder_requests
      WHERE status = 'Failed'
    `);



    res.json({

      totalProducts: Number(totalProducts.rows[0].count),

      totalReorders: Number(totalReorders.rows[0].count),

      lowStockProducts: Number(lowStock.rows[0].count),

      inventoryValue:
        Number(inventoryValue.rows[0].sum) || 0,


      pendingReorders:
        Number(pendingReorders.rows[0].count),


      completedReorders:
        Number(completedReorders.rows[0].count),


      failedReorders:
        Number(failedReorders.rows[0].count)

    });


  } catch (error) {

    console.error("Dashboard Error:", error);

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