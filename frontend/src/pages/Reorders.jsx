import { useEffect, useState } from "react";
import API from "../api/axios";

function Reorders() {

  const [reorders, setReorders] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchReorders = async () => {

    try {

      setLoading(true);

      const response = await API.get("/reorders");

      console.log("Reorder Response:", response.data);

      setReorders(
        Array.isArray(response.data.data)
          ? response.data.data
          : []
      );


    } catch (error) {

      console.log(
        "Reorder Fetch Error:",
        error
      );

      setReorders([]);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchReorders();

  }, []);



  const getStatusClass = (status) => {

    switch(status){

      case "Completed":
        return "bg-success";

      case "Failed":
        return "bg-danger";

      case "Pending Approval":
        return "bg-danger";

      default:
        return "bg-warning text-dark";

    }

  };

  const updateStatus = async(id,status)=>{

  try{

    await API.patch(
      `/reorders/${id}/status`,
      {
        status
      }
    );

    fetchReorders();

  }
  catch(error){

    console.log(error);

  }

};



  return (

    <div className="container mt-4">


      <div className="d-flex justify-content-between mb-4">

        <h2>
          Supplier Reorders
        </h2>


        <button
          className="btn btn-primary"
          onClick={fetchReorders}
        >
          Refresh
        </button>


      </div>



      {
        loading ? (

          <div className="text-center">

            <div className="spinner-border text-primary">
            </div>

            <p>
              Loading reorders...
            </p>

          </div>


        ) : (


        <table className="table table-bordered table-hover">


          <thead className="table-dark">
  <tr>
    <th>Product</th>
    <th>Supplier</th>
    <th>Quantity</th>
    <th>Total Price</th>
    <th>Status</th>
    <th>Created Date</th>
    <th>Action</th>
  </tr>
</thead>



          <tbody>


          {
            reorders.length === 0 ? (

              <tr>

                <td 
                colSpan="7"
                className="text-center"
                >

                  No reorder requests found.

                </td>

              </tr>


            ) : (


              reorders.map((item)=>(


                <tr key={item.id}>


                  <td>
                    {item.product_name}
                  </td>


                  <td>
                    {item.supplier_name || "Default Supplier"}
                  </td>


                  <td>
                    {item.quantity_ordered}
                  </td>


                  <td>
                    ₹ {Number(item.total_price).toLocaleString()}
                  </td>



                  <td>

<span 
className={
 item.status === "Completed"
 ? "badge bg-success"
 : item.status === "Failed"
 ? "badge bg-danger"
 : "badge bg-warning text-dark"
}
>
{item.status}
</span>

</td>



                  <td>

                    {
                      item.otp_verified ? (

                        <span className="badge bg-success">
                          Verified
                        </span>

                      ) : item.otp ? (

                        <span className="badge bg-danger">
                          Required
                        </span>

                      ) : (

                        <span className="badge bg-secondary">
                          Not Required
                        </span>

                      )
                    }

                  </td>



                  <td>

                    {
                      new Date(
                        item.created_at
                      ).toLocaleString()
                    }

                  </td>

                  <td>

  <button
    className="btn btn-success btn-sm me-2"
    onClick={() => updateStatus(item.id, "Completed")}
  >
    ✓
  </button>


  <button
    className="btn btn-danger btn-sm"
    onClick={() => updateStatus(item.id, "Failed")}
  >
    ✕
  </button>

</td>



                </tr>


              ))

            )
          }


          </tbody>


        </table>

        )

      }


    </div>

  );

}


export default Reorders;