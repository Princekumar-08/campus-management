import { useState } from "react";
import "./App.css";
import StudentAuth from "./StudentAuth";
import AdminAuth from "./AdminAuth";

function App() {

  const [page, setPage] = useState("home");

  if (page === "student") {
    return <StudentAuth />;
  }

  if (page === "admin") {
    return <AdminAuth />;
  }

  return (
    <div className="app">

      <div className="container">

        <h1>Campus Management</h1>

        <p className="subtitle">
          Manage campus complaints easily
        </p>

        <div className="role-container">

          <div className="role-card">

            <h2>Student</h2>

            <p>
              Register, login and raise your
              campus complaints.
            </p>

            <button
              onClick={() => setPage("student")}
            >
              Student
            </button>

          </div>

          <div className="role-card">

            <h2>Admin</h2>

            <p>
              Manage student complaints and
              update their status.
            </p>

            <button
              onClick={() => setPage("admin")}
            >
              Admin
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;