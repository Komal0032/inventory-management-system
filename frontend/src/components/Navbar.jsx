import { useState } from "react";
import { Bell, Search, User, Settings, LogOut, Menu } from "lucide-react";
import NotificationBell from "./NotificationBell";
import "./Navbar.css";

function Navbar({ toggleSidebar }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-inner">
        <div className="navbar-left">
          <button 
            className="mobile-menu-btn d-md-none"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          <div className="navbar-brand">
            <span className="brand-icon">📦</span>
            <span className="brand-text d-none d-sm-inline">Admin Dashboard</span>
          </div>
        </div>

        <div className="navbar-center d-none d-md-flex">
          <form onSubmit={handleSearch} className="search-form">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <div className="navbar-right">
          <NotificationBell />
          <div className="user-menu-wrapper">
            <button
              className="user-menu-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="user-avatar">
                <User size={20} />
              </div>
              <div className="user-info d-none d-sm-block">
                <div className="user-name">Admin</div>
              </div>
            </button>

            {showUserMenu && (
              <>
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">
                      <User size={24} />
                    </div>
                    <div className="dropdown-user-info">
                      <div className="dropdown-user-name">Admin User</div>
                      <div className="dropdown-user-email">admin@company.com</div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item">
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="dropdown-item">
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout-item">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
                <div 
                  className="dropdown-backdrop"
                  onClick={() => setShowUserMenu(false)}
                ></div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;