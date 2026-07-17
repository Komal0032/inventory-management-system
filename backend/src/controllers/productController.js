const productService = require("../services/productService");

// Add Product
const addProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: product,
    });

  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
      code: error.code || null,
      detail: error.detail || null,
    });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const search = req.query.search || "";

    const products = await productService.getAllProducts(search);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });

  } catch (error) {
    console.error("========== GET PRODUCTS ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Unknown Error",
      code: error.code || null,
      detail: error.detail || null,
    });
  }
};

// Get Product By ID
const getProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });

  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
      code: error.code || null,
      detail: error.detail || null,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });

  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
      code: error.code || null,
      detail: error.detail || null,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });

  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
      code: error.code || null,
      detail: error.detail || null,
    });
  }
};

// Update Stock
const updateStock = async (req, res) => {
  try {
    const { available_quantity } = req.body;

    const product = await productService.updateStock(
      req.params.id,
      available_quantity
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      data: product,
    });

  } catch (error) {
    console.error("UPDATE STOCK ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
      code: error.code || null,
      detail: error.detail || null,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  updateStock,
};