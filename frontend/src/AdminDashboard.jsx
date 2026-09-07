import { useState } from "react";
import "./AdminDashboard.css";
import AdminComplaint from "./AdminComplaint";

function AdminDashboard() {

  const [page, setPage] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.reload();
  };

  if (page === "complaints") {
    return (
      <AdminComplaint
        onBack={() => setPage("dashboard")}
      />
    );
  }

  return (
    <div className="admin-dashboard-page">

      <nav className="admin-dashboard-navbar">

        <h2>Campus Management</h2>

        <button onClick={handleLogout}>
          Logout
        </button>

      </nav>

      <div className="admin-dashboard-content">

        <h1>Admin Dashboard</h1>

        <p>
          Manage and resolve student complaints.
        </p>

        <div className="admin-dashboard-card">

          <h2>All Complaints</h2>

          <p>
            View all complaints raised by students
            and manage their status.
          </p>

          <button
            onClick={() => setPage("complaints")}
          >
            View Complaints
          </button>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;