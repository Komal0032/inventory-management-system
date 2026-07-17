function ProductTable({
  products,
  onDelete,
  onEdit,
  onUpdateStock,
}) {
  return (
    <table className="table table-bordered table-hover">

      <thead className="table-dark">

        <tr>

          <th>Name</th>

          <th>SKU</th>

          <th>Quantity</th>

          <th>Threshold</th>

          <th>Status</th>

          <th>Actions</th>

        </tr>

      </thead>

      <tbody>

        {products.map((product) => (

          <tr key={product.id}>

            <td>{product.product_name}</td>

            <td>{product.sku}</td>

            <td>{product.available_quantity}</td>

            <td>{product.low_stock_threshold}</td>

            <td>

              {product.available_quantity <
              product.low_stock_threshold ? (

                <span className="badge bg-danger">
                  Low Stock
                </span>

              ) : (

                <span className="badge bg-success">
                  Available
                </span>

              )}

            </td>

            <td>

              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => onEdit(product)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm me-2"
                onClick={() => onDelete(product.id)}
              >
                Delete
              </button>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => onUpdateStock(product)}
              >
                Stock
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default ProductTable;