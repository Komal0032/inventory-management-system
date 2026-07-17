import { useEffect, useState } from "react";
import API from "../api/axios";
import { Button } from "react-bootstrap";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await API.get("/notifications");
      setNotifications(response.data.data);
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };

  

  return (
    <div className="container mt-4">

      <h2 className="mb-4">🔔 Notifications</h2>

      {notifications.length === 0 ? (

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

                  <h5>{item.title}</h5>

                  <p>{item.message}</p>

                  <small className="text-muted">
                    {new Date(item.created_at).toLocaleString()}
                  </small>

                </div>

                <div>

                  {item.is_read ? (

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
                        onClick={() => markAsRead(item.id)}
                      >
                        Mark as Read
                      </Button>
                    </>

                  )}

                </div>

              </div>

            </div>

          </div>

        ))

      )}

    </div>
  );
}

export default Notifications;