import { useEffect, useState } from "react";
import { 
  Package, 
  ShoppingCart, 
  AlertTriangle, 
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import API from "../api/axios";
import "./Dashboard.css";
import DashboardChart from "../components/DashboardChart";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalReorders: 0,
    lowStockProducts: 0,
    inventoryValue: 0,
    pendingReorders: 0,
    completedReorders: 0,
    failedReorders: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch stats
      const statsResponse = await API.get("/dashboard/stats");
      setStats(statsResponse.data);

      // Fetch recent activities
      const activitiesResponse = await API.get("/dashboard/recent-activities");
      setRecentActivities(activitiesResponse.data || []);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "primary",
      bgColor: "bg-primary-subtle",
      iconBg: "bg-primary",
      change: "+12%",
      changeType: "increase"
    },
    {
      title: "Total Reorders",
      value: stats.totalReorders,
      icon: ShoppingCart,
      color: "info",
      bgColor: "bg-info-subtle",
      iconBg: "bg-info",
      change: "+5%",
      changeType: "increase"
    },
    {
      title: "Low Stock Alerts",
      value: stats.lowStockProducts,
      icon: AlertTriangle,
      color: "warning",
      bgColor: "bg-warning-subtle",
      iconBg: "bg-warning",
      change: stats.lowStockProducts > 0 ? "+2" : "0",
      changeType: stats.lowStockProducts > 0 ? "increase" : "neutral"
    },
    {
      title: "Inventory Value",
      value: `₹${stats.inventoryValue.toLocaleString()}`,
      icon: TrendingUp,
      color: "success",
      bgColor: "bg-success-subtle",
      iconBg: "bg-success",
      change: "+8.5%",
      changeType: "increase"
    }
  ];

  const reorderStats = [
    {
      title: "Pending",
      value: stats.pendingReorders,
      icon: Clock,
      color: "warning",
      bgColor: "bg-warning-subtle"
    },
    {
      title: "Completed",
      value: stats.completedReorders,
      icon: CheckCircle,
      color: "success",
      bgColor: "bg-success-subtle"
    },
    {
      title: "Failed",
      value: stats.failedReorders,
      icon: XCircle,
      color: "danger",
      bgColor: "bg-danger-subtle"
    }
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Dashboard</h2>
          <p className="dashboard-subtitle">Overview of your inventory management system</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-primary-custom" onClick={fetchDashboardData}>
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div className="col-xl-3 col-lg-6 col-md-6" key={index}>
              <div className="stat-card">
                <div className="stat-card-header">
                  <div className={`stat-icon-wrapper ${stat.bgColor}`}>
                    <Icon size={24} className={`text-${stat.color}`} />
                  </div>
                  <div className="stat-change">
                    {stat.changeType === "increase" && <ArrowUp size={14} className="text-success" />}
                    {stat.changeType === "decrease" && <ArrowDown size={14} className="text-danger" />}
                    <span className={`text-${stat.changeType === "increase" ? "success" : stat.changeType === "decrease" ? "danger" : "secondary"}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="stat-card-body">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.title}</p>
                </div>
                <div className={`stat-progress-bar ${stat.color}`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reorder Stats */}
      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="section-header">
            <h5 className="section-title">Reorder Status Overview</h5>
          </div>
        </div>
        {reorderStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div className="col-md-4" key={index}>
              <div className="reorder-stat-card">
                <div className="reorder-stat-content">
                  <div className={`reorder-stat-icon ${stat.bgColor}`}>
                    <Icon size={20} className={`text-${stat.color}`} />
                  </div>
                  <div>
                    <h4 className="reorder-stat-value">{stat.value}</h4>
                    <p className="reorder-stat-label">{stat.title}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inventory Chart */}
<div className="row mb-4">
  <div className="col-12">
    <DashboardChart
      totalProducts={stats.totalProducts}
      lowStockProducts={stats.lowStockProducts}
      totalReorders={stats.totalReorders}
    />
  </div>
</div>

      {/* Recent Activities */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="activity-card">
            <div className="activity-card-header">
              <h5 className="activity-title">Recent Activities</h5>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="activity-list">
              {recentActivities.length === 0 ? (
                <div className="empty-state">
                  <p className="text-muted">No recent activities</p>
                </div>
              ) : (
                recentActivities.map((activity, index) => (
                  <div className="activity-item" key={index}>
                    <div className="activity-icon-wrapper">
                      {activity.type === 'product' && <Package size={16} />}
                      {activity.type === 'reorder' && <ShoppingCart size={16} />}
                      {activity.type === 'alert' && <AlertTriangle size={16} />}
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">{activity.message}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                    {activity.status && (
                      <span className={`activity-status ${activity.status}`}>
                        {activity.status}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-lg-4">
          <div className="quick-actions-card">
            <h5 className="quick-actions-title">Quick Actions</h5>
            <div className="quick-actions-list">
              <button className="quick-action-btn primary">
                <Package size={20} />
                <span>Add New Product</span>
              </button>
              <button className="quick-action-btn info">
                <ShoppingCart size={20} />
                <span>Create Reorder</span>
              </button>
              <button className="quick-action-btn warning">
                <AlertTriangle size={20} />
                <span>View Low Stock</span>
              </button>
              <button className="quick-action-btn success">
                <TrendingUp size={20} />
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;