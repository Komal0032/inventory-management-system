const pool = require("../config/db");
const reorderService = require("./reorderService");
const { getIO } = require("../config/socket");

const notificationService = require("./notificationService");

// Create Product
const createProduct = async (product) => {
  const {
    product_name,
    sku,
    available_quantity,
    low_stock_threshold,
    cost_price,
  } = product;

  const query = `
    INSERT INTO products
    (product_name, sku, available_quantity, low_stock_threshold, cost_price)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    product_name,
    sku,
    available_quantity,
    low_stock_threshold,
    cost_price,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

// Get All Products
const getAllProducts = async (search = "") => {

  const query = `
    SELECT *
    FROM products
    WHERE
      product_name ILIKE $1
      OR sku ILIKE $1
    ORDER BY id ASC;
  `;

  const result = await pool.query(query, [`%${search}%`]);

  return result.rows;
};

// Get Product By ID
const getProductById = async (id) => {
  const query = `
    SELECT *
    FROM products
    WHERE id = $1;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};



// Update Product
const updateProduct = async (id, product) => {
  const {
    product_name,
    sku,
    available_quantity,
    low_stock_threshold,
    cost_price,
  } = product;

  const query = `
    UPDATE products
    SET
      product_name = $1,
      sku = $2,
      available_quantity = $3,
      low_stock_threshold = $4,
      cost_price = $5,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
    RETURNING *;
  `;

  const values = [
    product_name,
    sku,
    available_quantity,
    low_stock_threshold,
    cost_price,
    id,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

// Delete Product
const deleteProduct = async (id) => {
  const query = `
    DELETE FROM products
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

// Update Stock
// Update Stock
const updateStock = async (id, quantity) => {

  const updateQuery = `
    UPDATE products
    SET
      available_quantity = $1,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *;
  `;

  const updateResult = await pool.query(updateQuery, [quantity, id]);

  const product = updateResult.rows[0];

  if (!product) {
    return null;
  }

  // Check Low Stock
if (product.available_quantity < product.low_stock_threshold) {
  // Save notification in database
  await notificationService.createNotification(
    "Low Stock Alert",
    `${product.product_name} is low in stock. Current Quantity: $//{product.available_quantity}`
  );

  // Send real-time notification
  const io = getIO();

  console.log("🔥 Low stock detected");

  io.emit("low-stock", {
    message: `${product.product_name} is running low on stock`,
    productId: product.id,
    productName: product.product_name,
    availableQuantity: product.available_quantity,
    threshold: product.low_stock_threshold,
    time: new Date(),
  });

  console.log("✅ Socket event emitted");

  // Create reorder
  const reorderQuantity = product.low_stock_threshold * 2;

  await reorderService.createReorder(
    product.id,
    product.product_name,
    reorderQuantity,
    product.cost_price
  );
}

  return product;
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock ,
};