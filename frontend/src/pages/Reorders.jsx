import { useEffect, useState } from "react";
import API from "../api/axios";

function Reorders() {

  const [reorders, setReorders] = useState([]);

  const fetchReorders = async () => {
    try {
      const response = await API.get("/reorders");
      setReorders(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReorders();
  }, []);

  return (
    <div className="container">

      <h2 className="mb-4">Supplier Reorders</h2>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th>Supplier</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Created Date</th>
          </tr>
        </thead>

        <tbody>

          {reorders.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No reorder requests found.
              </td>
            </tr>
          ) : (
            reorders.map((item) => (
              <tr key={item.id}>
                <td>{item.product_name}</td>
                <td>{item.supplier_name}</td>
                <td>{item.quantity_ordered}</td>
                <td>₹ {item.total_price}</td>
                <td>
                  <span className="badge bg-warning text-dark">
                    {item.status}
                  </span>
                </td>
                <td>
                  {new Date(item.created_at).toLocaleString()}
                </td>
              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default Reorders;