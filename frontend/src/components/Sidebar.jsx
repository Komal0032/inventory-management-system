import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const menuItems = [
    { path: "/", label: "Dashboard", emoji: "📊" },
    { path: "/inventory", label: "Inventory", emoji: "📦" },
    { path: "/reorders", label: "Reorders", emoji: "🛒" },
    { path: "/notifications", label: "Notifications", emoji: "🔔" },
    { path: "/settings", label: "Settings", emoji: "⚙️" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        <span className="hamburger-icon">☰</span>
      </button>

      {/* Overlay */}
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        {/* Brand Logo Section */}
        <div className="sidebar-brand">
          <div className="brand-content">
            <div className="brand-logo">
              <span className="brand-icon">📦</span>
              <span className="brand-name">InventoryPro</span>
            </div>
            <button className="sidebar-close-btn" onClick={closeSidebar}>
              ✕
            </button>
          </div>
          <small className="brand-subtitle">Inventory Management System</small>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="nav-menu">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <li className="nav-item" key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive ? "active" : ""}`}
                    onClick={closeSidebar}
                  >
                    <span className="nav-emoji">{item.emoji}</span>
                    <span className="nav-label">{item.label}</span>
                    {isActive && <span className="active-indicator" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <span>👤</span>
            </div>
            <div className="user-info">
              <div className="user-name">Admin User</div>
              <div className="user-email">admin@company.com</div>
            </div>
            <button className="logout-btn" title="Logout">
              <span style={{ fontSize: "1.1rem" }}>🚪</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;