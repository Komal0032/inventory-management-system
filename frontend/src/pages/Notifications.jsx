import { useEffect, useState } from "react";
import API from "../api/axios";
import { Button } from "react-bootstrap";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {

      const response = await API.get("/notifications");

      console.log("Notifications Page Response:", response.data);

      const notificationData = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      setNotifications(notificationData);

    } catch (error) {

      console.log("Notification Fetch Error:", error);

      setNotifications([]);

    }
  };


  useEffect(() => {

    fetchNotifications();

  }, []);



  const markAsRead = async (id) => {

    try {

      await API.patch(`/notifications/${id}/read`);

      fetchNotifications();

    } catch (error) {

      console.log("Mark Read Error:", error);

    }

  };



  const deleteNotification = async (id) => {

    try {

      await API.delete(`/notifications/${id}`);

      fetchNotifications();

    } catch (error) {

      console.log("Delete Error:", error);

    }

  };



  return (

    <div className="container mt-4">

      <h2 className="mb-4">
        🔔 Notifications
      </h2>


      {
        notifications.length === 0 ? (

          <div className="alert alert-info">
            No notifications available.
          </div>

        ) : (

          notifications.map((item) => (

            <div
              key={item.id}
              className="card mb-3 shadow-sm"
            >

              <div className="card-body">


                <div className="d-flex justify-content-between">


                  <div>

                    <h5>
                      {item.title}
                    </h5>


                    <p>
                      {item.message}
                    </p>


                    <small className="text-muted">

                      {
                        item.created_at &&
                        new Date(
                          item.created_at
                        ).toLocaleString()
                      }

                    </small>


                  </div>



                  <div className="text-end">


                    {
                      item.is_read ? (

                        <span className="badge bg-success">
                          Read
                        </span>


                      ) : (


                        <>

                          <span className="badge bg-danger mb-2">
                            Unread
                          </span>


                          <br />


                          <Button
                            size="sm"
                            onClick={() =>
                              markAsRead(item.id)
                            }
                          >
                            Mark as Read
                          </Button>

                        </>


                      )
                    }



                    <br />


                    <Button
                      variant="danger"
                      size="sm"
                      className="mt-2"
                      onClick={() =>
                        deleteNotification(item.id)
                      }
                    >
                      Delete
                    </Button>


                  </div>


                </div>


              </div>


            </div>


          ))

        )
      }


    </div>

  );

}


export default Notifications;