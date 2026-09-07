import { useEffect, useState } from "react";
import "./MyComplaints.css";
import API_URL from "./api";

function MyComplaints({ onBack }) {
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState("Loading complaints...");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const token = localStorage.getItem("studentToken");

    if (!token) {
      setMessage("Please login again.");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const studentId = payload.sub;

      const response = await fetch(
        `${API_URL}/complaints/student/${studentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setComplaints(result);

        if (result.length === 0) {
          setMessage("No complaints found.");
        } else {
          setMessage("");
        }
      } else {
        setMessage("Unable to load complaints.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server.");
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) {
      return "Date unavailable";
    }

    const date = new Date(dateTime);

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatStatus = (status) => {
    if (!status) {
      return "Pending";
    }

    switch (status.toUpperCase()) {
      case "IN_PROGRESS":
        return "In Progress";

      case "RESOLVED":
        return "Resolved";

      case "ASSIGNED":
        return "Assigned";

      case "PENDING":
        return "Pending";

      default:
        return status;
    }
  };

  const formatPriority = (priority) => {
    if (!priority) {
      return "Medium";
    }

    return (
      priority.charAt(0).toUpperCase() +
      priority.slice(1).toLowerCase()
    );
  };

  const formatComplaintType = (type) => {
    if (!type) {
      return "Campus Issue";
    }

    if (type === "CANTEEN_SHOP") {
      return "Canteen / Shop Issue";
    }

    return "Campus Issue";
  };

  return (
    <div className="complaints-page">

      <div className="complaints-container">

        {/* Header */}
        <div className="complaints-header">

          <div className="header-left">
            <h1>My Complaints</h1>

            <p>
              Track your complaints and admin responses
            </p>
          </div>

          <button
            className="back-dashboard-button"
            onClick={onBack}
          >
            <span className="right-arrow">→</span>
            Back to Dashboard
          </button>

        </div>

        {/* Message */}
        {message && (
          <p className="complaints-message">
            {message}
          </p>
        )}

        {/* Complaint List */}
        {!message &&
          complaints.map((complaint, index) => {

            const status =
              complaint.status || "PENDING";

            const priority =
              complaint.priority || "MEDIUM";

            return (
              <div
                className="complaint-item"
                key={complaint.id}
              >

                {/* Complaint Number */}
                <div className="complaint-number">
                  {index + 1}
                </div>

                {/* Complaint Type */}
                <div className="complaint-type">
                  {formatComplaintType(
                    complaint.complaintType
                  )}
                </div>

                {/* Category */}
                {complaint.category && (
                  <div className="complaint-category">
                    {complaint.category}
                  </div>
                )}

                {/* Subject */}
                <h2>
                  {complaint.subject}
                </h2>

                {/* Description */}
                <p className="complaint-description">
                  {complaint.description}
                </p>

                {/* Location */}
                {complaint.location && (
                  <div className="complaint-detail">
                    <strong>Location:</strong>
                    <span>
                      {complaint.location}
                    </span>
                  </div>
                )}

                {/* Priority */}
                <div className="complaint-detail">
                  <strong>Priority:</strong>

                  <span
                    className={`priority ${priority.toLowerCase()}`}
                  >
                    {formatPriority(priority)}
                  </span>
                </div>

                {/* Status */}
                <div
                  className={`status ${status.toLowerCase()}`}
                >
                  {status.toUpperCase() === "RESOLVED"
                    ? "Resolved ✅"
                    : formatStatus(status)}
                </div>

                {/* Admin Response */}
                {complaint.adminSuggestion && (
                  <div className="student-admin-message">

                    <strong>
                      Admin Response
                    </strong>

                    <p>
                      {complaint.adminSuggestion}
                    </p>

                  </div>
                )}

                {/* Evidence */}
                {complaint.photoUrl && (
                  <div className="complaint-evidence">

                    <strong>
                      Evidence:
                    </strong>

                    <a
                      href={complaint.photoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Image
                    </a>

                  </div>
                )}

                {/* Date */}
                <div className="complaint-date">
                  Submitted on:{" "}
                  {formatDateTime(
                    complaint.createdAt
                  )}
                </div>

                {/* Updated Date */}
                {complaint.updatedAt && (
                  <div className="complaint-updated-date">
                    Last updated:{" "}
                    {formatDateTime(
                      complaint.updatedAt
                    )}
                  </div>
                )}

              </div>
            );
          })}

      </div>

    </div>
  );
}

export default MyComplaints;