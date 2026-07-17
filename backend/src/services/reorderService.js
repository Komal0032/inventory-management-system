const pool = require("../config/db");

const createReorder = async (
  product_id,
  product_name,
  quantity,
  cost_price
) => {
  try {
    const supplier_name = "Default Supplier";
    const quantity_ordered = quantity;

    // Convert cost_price to number
    const total_price = quantity_ordered * Number(cost_price);

    console.log("Creating Reorder...");
    console.log({
      product_id,
      product_name,
      supplier_name,
      quantity_ordered,
      total_price,
    });

    const query = `
      INSERT INTO reorder_requests
      (
        product_id,
        product_name,
        supplier_name,
        quantity_ordered,
        total_price
      )
      VALUES($1,$2,$3,$4,$5)
      RETURNING *;
    `;

    const values = [
      product_id,
      product_name,
      supplier_name,
      quantity_ordered,
      total_price,
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
} catch (error) {
  console.error("========== REORDER ERROR ==========");
  console.error("Message:", error.message);
  console.error("Code:", error.code);
  console.error("Detail:", error.detail);
  console.error("Constraint:", error.constraint);
  console.error(error);
  throw error;
}
};

module.exports = {
  createReorder,
};