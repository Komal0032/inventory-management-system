import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./MainLayout.css";

function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main-layout">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="layout-body">
        <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
          <Sidebar />
        </div>

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;