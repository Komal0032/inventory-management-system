const { body, validationResult } = require("express-validator");

const validateProduct = [
  body("product_name")
    .notEmpty()
    .withMessage("Product name is required"),

  body("sku")
    .notEmpty()
    .withMessage("SKU is required"),

  body("available_quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be 0 or greater"),

  body("low_stock_threshold")
    .isInt({ min: 0 })
    .withMessage("Low stock threshold must be 0 or greater"),

  body("cost_price")
    .isFloat({ min: 0 })
    .withMessage("Cost price must be greater than or equal to 0"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = validateProduct;