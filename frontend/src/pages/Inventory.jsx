import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductTable from "../components/ProductTable";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import UpdateStock from "./UpdateStock";

import { exportProductsToExcel } from "../utils/exportExcel";

function Inventory() {

  const [products, setProducts] = useState([]);
   const [showAddModal, setShowAddModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);

const [showStockModal, setShowStockModal] = useState(false);
const [stockProduct, setStockProduct] = useState(null);
const [search, setSearch] = useState("");

const [showLowStock, setShowLowStock] = useState(false);

  const fetchProducts = async () => {
  try {
    const response = await API.get(
      `/products?search=${search}`
    );

    setProducts(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

 useEffect(() => {
  fetchProducts();
}, [search]);

  const deleteProduct = async (id) => {

    if (!window.confirm("Delete this product?")) {
      return;
    }

    try {

      await API.delete(`/products/${id}`);

      fetchProducts();

      alert("Product Deleted");

    } catch (error) {

      console.log(error);

    }

  };
const editProduct = (product) => {

    setSelectedProduct(product);

    setShowEditModal(true);

};
  const updateStock = (product) => {

    setStockProduct(product);

    setShowStockModal(true);

};

 
  const openAddModal = () => {
    setShowAddModal(true);
};

const closeAddModal = () => {
    setShowAddModal(false);
};

const closeEditModal = () => {

    setShowEditModal(false);

    setSelectedProduct(null);

};

const closeStockModal = () => {

    setShowStockModal(false);

    setStockProduct(null);

};

const filteredProducts = showLowStock
  ? products.filter(
      (product) =>
        product.available_quantity <= product.low_stock_threshold
    )
  : products;

  return (

    <div className="container">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Inventory</h2>

        <button
    className="btn btn-success"
    onClick={openAddModal}
>
    + Add Product
</button>
<button
  className="btn btn-success ms-2"
  onClick={() => exportProductsToExcel(filteredProducts)}
>📥 Export Excel
</button>

      </div>
      <div className="mb-3">
  <input
    type="text"
    className="form-control"
    placeholder="Search by Product Name or SKU..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

<div className="d-flex gap-2 mb-3">
  <button
    className={`btn ${!showLowStock ? "btn-primary" : "btn-outline-primary"}`}
    onClick={() => setShowLowStock(false)}
  >
    All Products
  </button>

  <button
    className={`btn ${showLowStock ? "btn-danger" : "btn-outline-danger"}`}
    onClick={() => setShowLowStock(true)}
  >
    Low Stock Only
  </button>
</div>



      <ProductTable
  products={filteredProducts}
  onDelete={deleteProduct}
  onEdit={editProduct}
  onUpdateStock={updateStock}
/>

      <AddProduct
    show={showAddModal}
    handleClose={closeAddModal}
    refreshProducts={fetchProducts}
/>

 <EditProduct
    show={showEditModal}
    handleClose={closeEditModal}
    refreshProducts={fetchProducts}
    product={selectedProduct}
/>

  <UpdateStock
    show={showStockModal}
    handleClose={closeStockModal}
    product={stockProduct}
    refreshProducts={fetchProducts}
/>
    </div>

  );

}

export default Inventory;