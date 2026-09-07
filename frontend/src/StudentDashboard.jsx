import { useState } from "react";
import "./StudentDashboard.css";

import RaiseComplaint from "./RaiseComplaint";
import MyComplaints from "./MyComplaints";
import LostFound from "./LostFound";

function StudentDashboard() {
  const [page, setPage] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    window.location.reload();
  };

  if (page === "raiseComplaint") {
    return (
      <RaiseComplaint
        onBack={() => setPage("dashboard")}
      />
    );
  }

  if (page === "myComplaints") {
    return (
      <MyComplaints
        onBack={() => setPage("dashboard")}
      />
    );
  }

  if (page === "lostFound") {
    return (
      <LostFound
        onBack={() => setPage("dashboard")}
      />
    );
  }

  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <nav className="dashboard-navbar">

        <div className="navbar-brand">
          <h2>Campus Management</h2>
          <span>Student Portal</span>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </nav>


      {/* Main Content */}
      <div className="dashboard-content">

        <div className="dashboard-heading">
          <h1>Student Dashboard</h1>

          <p>
            Manage campus services, report issues and stay updated.
          </p>
        </div>


        {/* Dashboard Cards */}
        <div className="dashboard-cards">

          {/* Report Campus Issue */}
          <div className="dashboard-card">

            <div className="card-icon">
              🛠️
            </div>

            <h2>
              Report Campus Issue
            </h2>

            <p>
              Report problems related to water,
              cleanliness, classroom equipment,
              electricity and other campus facilities.
            </p>

            <button
              onClick={() => setPage("raiseComplaint")}
            >
              Report Issue
            </button>

          </div>


          {/* My Complaints */}
          <div className="dashboard-card">

            <div className="card-icon">
              📋
            </div>

            <h2>
              My Complaints
            </h2>

            <p>
              Track your reported issues,
              complaint status and admin responses.
            </p>

            <button
              onClick={() => setPage("myComplaints")}
            >
              View Complaints
            </button>

          </div>


          {/* Lost & Found */}
          <div className="dashboard-card">

            <div className="card-icon">
              🔍
            </div>

            <h2>
              Lost & Found
            </h2>

            <p>
              Report a lost item or submit information
              about an item you found on campus.
            </p>

            <button
              onClick={() => setPage("lostFound")}
            >
              Open Lost & Found
            </button>

          </div>


          {/* Canteen & Shop */}
          <div className="dashboard-card">

            <div className="card-icon">
              🍽️
            </div>

            <h2>
              Canteen & Shop Issues
            </h2>

            <p>
              Report overcharging, expired products,
              poor quality, hygiene or billing issues.
            </p>

            <button
              className="coming-soon-button"
              disabled
            >
              Coming Soon
            </button>

          </div>


          {/* Medical Assistance */}
          <div className="dashboard-card">

            <div className="card-icon">
              🏥
            </div>

            <h2>
              Medical Assistance
            </h2>

            <p>
              Request medical assistance or
              report an urgent health-related need.
            </p>

            <button
              className="coming-soon-button"
              disabled
            >
              Coming Soon
            </button>

          </div>


          {/* Notices */}
          <div className="dashboard-card">

            <div className="card-icon">
              📢
            </div>

            <h2>
              Notices & Announcements
            </h2>

            <p>
              View important campus announcements,
              alerts and official notices.
            </p>

            <button
              className="coming-soon-button"
              disabled
            >
              Coming Soon
            </button>

          </div>


          {/* Feedback */}
          <div className="dashboard-card">

            <div className="card-icon">
              💬
            </div>

            <h2>
              Feedback & Suggestions
            </h2>

            <p>
              Share your feedback and suggestions
              to help improve campus services.
            </p>

            <button
              className="coming-soon-button"
              disabled
            >
              Coming Soon
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;