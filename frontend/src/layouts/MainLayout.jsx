import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "./MainLayout.css";


function MainLayout() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (

    <div className="main-layout">


      <Navbar 
        toggleSidebar={toggleSidebar}
      />


      <div className="layout-body">


        <div 
          className={`sidebar-wrapper ${
            isSidebarOpen ? "open" : ""
          }`}
        >

          <Sidebar />

        </div>



        <main className="main-content">

          <Outlet />

        </main>


      </div>


    </div>

  );

}


export default MainLayout;