const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

const validateProduct = require("../middleware/productValidation");

// Create Product
router.post(
  "/",
  validateProduct,
  productController.addProduct
);
// Get All Products
router.get("/", productController.getProducts);

router.get("/hello", (req, res) => {
  res.json({ message: "Hello from Product Routes" });
});

// Get Product By ID
router.get("/:id", productController.getProduct);

//put -update product
router.put(
  "/:id",
  validateProduct,
  productController.updateProduct
);



//delete product
router.delete("/:id", productController.deleteProduct);


//patch 
router.patch("/:id/stock", productController.updateStock);



module.exports = router;