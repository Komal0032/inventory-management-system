import { useState, useEffect, useRef } from "react";
import {
  Bell,
  X,
  CheckCheck,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import socket from "../socket";

import "./NotificationBell.css";


function NotificationBell() {

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);



  const fetchNotifications = async () => {

    try {

      const response = await API.get("/notifications");

      console.log(
        "Notifications:",
        response.data
      );


      const notificationData =
        Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];


      setNotifications(notificationData);


    } catch(error) {

      console.log(
        "Notification error:",
        error
      );

      setNotifications([]);

    }

  };




  useEffect(() => {


    fetchNotifications();



    socket.on(
      "low-stock",
      fetchNotifications
    );



    const closeDropdown = (event) => {

      if(
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ){

        setIsOpen(false);

      }

    };


    document.addEventListener(
      "mousedown",
      closeDropdown
    );



    return () => {

      socket.off(
        "low-stock",
        fetchNotifications
      );


      document.removeEventListener(
        "mousedown",
        closeDropdown
      );

    };


  }, []);





  // Always array
  const notificationList =
    Array.isArray(notifications)
      ? notifications
      : [];



  const unreadCount =
   (notificationList || []).filter(
      (item)=> !item.is_read
    ).length;





  const markAsRead = async(id)=>{

    try{

      await API.patch(
        `/notifications/${id}/read`
      );

      fetchNotifications();

    }
    catch(error){

      console.log(error);

    }

  };






  const markAllAsRead = async()=>{

    try{

      for(
        const item of notificationList
      ){

        if(!item.is_read){

          await API.patch(
            `/notifications/${item.id}/read`
          );

        }

      }


      fetchNotifications();


    }
    catch(error){

      console.log(error);

    }

  };







  const deleteNotification = async(id)=>{

    try{

      await API.delete(
        `/notifications/${id}`
      );


      fetchNotifications();


    }
    catch(error){

      console.log(error);

    }

  };







  return (

    <div
      className="notification-bell-container"
      ref={dropdownRef}
    >


      <button

        className="notification-bell-btn"

        onClick={() =>
          setIsOpen(!isOpen)
        }

      >

        <Bell size={22}/>


        {
          unreadCount > 0 && (

            <span className="notification-badge">
              {unreadCount}
            </span>

          )
        }


      </button>






      {
        isOpen && (

          <div className="notification-dropdown">



            <div className="notification-header">


              <h5>
                Notifications
              </h5>



              {
                unreadCount > 0 && (

                  <button

                    className="mark-all-read-btn"

                    onClick={
                      markAllAsRead
                    }

                  >

                    <CheckCheck size={16}/>

                    Mark All

                  </button>

                )
              }


            </div>







            <div className="notification-body">


              {
                notificationList.length === 0 ? (


                  <div className="empty-notifications">

                    No Notifications

                  </div>


                ) : (


                  notificationList.map(
                    (item)=>(

                      <div

                        key={item.id}

                        className={
                          `notification-item ${
                            !item.is_read
                            ? "unread"
                            : ""
                          }`
                        }

                      >


                        <div className="notification-icon">

                          <AlertCircle
                            size={20}
                          />

                        </div>



                        <div className="notification-content">


                          <strong>
                            {item.title}
                          </strong>


                          <p>
                            {item.message}
                          </p>


                          <small>

                            {
                              item.created_at &&
                              new Date(
                                item.created_at
                              )
                              .toLocaleString()
                            }

                          </small>


                        </div>





                        <div className="notification-actions">


                          {
                            !item.is_read && (

                              <button
                                onClick={() =>
                                  markAsRead(
                                    item.id
                                  )
                                }
                              >
                                ✓
                              </button>

                            )
                          }




                          <button

                            onClick={() =>
                              deleteNotification(
                                item.id
                              )
                            }

                          >

                            <X size={16}/>

                          </button>



                        </div>



                      </div>


                    )

                  )


                )
              }



            </div>






            <div className="notification-footer">


              <button

                className="view-all-btn"

                onClick={()=>{

                  navigate(
                    "/notifications"
                  );

                  setIsOpen(false);

                }}

              >

                View All Notifications

              </button>


            </div>




          </div>

        )

      }



    </div>

  );

}


export default NotificationBell;