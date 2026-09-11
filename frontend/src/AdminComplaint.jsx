import { useEffect, useState } from "react";
import "./AdminComplaint.css";
import API_URL from "./api";

function AdminComplaint({ onBack }) {
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState("Loading complaints...");
  const [suggestions, setSuggestions] = useState({});
  const [savingId, setSavingId] = useState("");

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setMessage("Admin login required.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/complaints/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setComplaints(result);

        const existingSuggestions = {};

        result.forEach((complaint) => {
          existingSuggestions[complaint.id] =
            complaint.adminSuggestion || "";
        });

        setSuggestions(existingSuggestions);
        setMessage("");
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

    return new Date(dateTime).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const updateComplaintStatus = async (complaintId) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setMessage("Admin login required.");
      return;
    }

    setSavingId(complaintId);

    try {
      const response = await fetch(
        `${API_URL}/complaints/${complaintId}/status?status=RESOLVED`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setMessage("Unable to resolve complaint.");
        return;
      }

      setComplaints((current) =>
        current.map((complaint) =>
          complaint.id === result.id ? result : complaint
        )
      );

      setMessage("Complaint marked as resolved.");
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server.");
    } finally {
      setSavingId("");
    }
  };

  const saveMessage = async (complaintId) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setMessage("Admin login required.");
      return;
    }

    const suggestion = suggestions[complaintId]?.trim();

    if (!suggestion) {
      setMessage("Please enter a message.");
      return;
    }

    setSavingId(complaintId);

    try {
      const response = await fetch(
        `${API_URL}/complaints/${complaintId}/message?adminSuggestion=${encodeURIComponent(
          suggestion
        )}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setMessage("Unable to save message.");
        return;
      }

      setComplaints((current) =>
        current.map((complaint) =>
          complaint.id === result.id ? result : complaint
        )
      );

      setSuggestions((current) => ({
        ...current,
        [complaintId]: result.adminSuggestion || "",
      }));

      setMessage("Message saved successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server.");
    } finally {
      setSavingId("");
    }
  };

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) =>
      complaint.status?.toUpperCase() === "PENDING"
  ).length;

  const inProgressComplaints = complaints.filter(
    (complaint) =>
      complaint.status?.toUpperCase() === "IN_PROGRESS"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) =>
      complaint.status?.toUpperCase() === "RESOLVED"
  ).length;

  const filteredComplaints = complaints.filter((complaint) => {
    const status =
      complaint.status?.toUpperCase() || "PENDING";

    const matchesStatus =
      filterStatus === "ALL" ||
      status === filterStatus;

    const searchText = search.toLowerCase();

    const matchesSearch =
      complaint.subject?.toLowerCase().includes(searchText) ||
      complaint.description?.toLowerCase().includes(searchText) ||
      complaint.aiSummary?.toLowerCase().includes(searchText) ||
      complaint.category?.toLowerCase().includes(searchText) ||
      complaint.location?.toLowerCase().includes(searchText) ||
      complaint.studentId?.toLowerCase().includes(searchText);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="admin-complaints-page">

      <div className="admin-complaints-container">

        {/* Header */}
        <div className="admin-complaints-header">

          <div>
            <h1>Complaint Management</h1>

            <p>
              Manage and resolve campus complaints
            </p>
          </div>

          <button
            className="admin-back-button"
            onClick={onBack}
          >
            <span>←</span>
            Back to Dashboard
          </button>

        </div>


        {/* Summary Cards */}
        <div className="complaint-summary">

          <div className="summary-card">
            <span className="summary-number">
              {totalComplaints}
            </span>

            <span className="summary-title">
              Total Complaints
            </span>
          </div>


          <div className="summary-card">
            <span className="summary-number">
              {pendingComplaints}
            </span>

            <span className="summary-title">
              Pending
            </span>
          </div>


          <div className="summary-card">
            <span className="summary-number">
              {inProgressComplaints}
            </span>

            <span className="summary-title">
              In Progress
            </span>
          </div>


          <div className="summary-card">
            <span className="summary-number">
              {resolvedComplaints}
            </span>

            <span className="summary-title">
              Resolved
            </span>
          </div>

        </div>


        {/* Search + Filter */}
        <div className="complaint-controls">

          <input
            type="text"
            className="complaint-search"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />


          <select
            className="complaint-filter"
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value)
            }
          >
            <option value="ALL">
              All Complaints
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="IN_PROGRESS">
              In Progress
            </option>

            <option value="RESOLVED">
              Resolved
            </option>
          </select>

        </div>


        {/* Message */}
        {message && (
          <p className="admin-complaints-message">
            {message}
          </p>
        )}


        {/* Empty State */}
        {!message &&
          filteredComplaints.length === 0 && (
            <div className="empty-complaints">

              <h3>No complaints found</h3>

              <p>
                Try changing the search or filter.
              </p>

            </div>
          )}


        {/* Complaints */}
        {filteredComplaints.map((complaint) => {

          const originalIndex =
            complaints.findIndex(
              (item) => item.id === complaint.id
            ) + 1;

          const isResolved =
            complaint.status?.toUpperCase() === "RESOLVED";

          const isSaving =
            savingId === complaint.id;

          const priority =
            complaint.priority || "MEDIUM";


          /*
           * IMPORTANT:
           * Admin will see AI summary instead of
           * the original full description.
           *
           * Old complaints without aiSummary will
           * still show their original description.
           */
          const adminDescription =
            complaint.aiSummary?.trim() ||
            complaint.description ||
            "No complaint description available.";


          return (
            <div
              className="admin-complaint-card"
              key={complaint.id}
            >

              {/* Top Row */}
              <div className="complaint-top-row">

                <span className="admin-complaint-number">
                  {originalIndex}
                </span>


                <div className="complaint-badges">

                  <span
                    className={`admin-status ${
                      isResolved
                        ? "resolved"
                        : complaint.status?.toLowerCase() ===
                          "in_progress"
                        ? "in-progress"
                        : "pending"
                    }`}
                  >
                    {isResolved
                      ? "Resolved ✅"
                      : complaint.status === "IN_PROGRESS"
                      ? "In Progress"
                      : "Pending"}
                  </span>


                  <span
                    className={`admin-priority ${priority.toLowerCase()}`}
                  >
                    {priority}
                  </span>

                </div>

              </div>


              {/* Type */}
              {complaint.complaintType && (
                <span className="complaint-type">

                  {complaint.complaintType ===
                  "CANTEEN_SHOP"
                    ? "Canteen / Shop"
                    : "Campus Issue"}

                </span>
              )}


              {/* Category */}
              {complaint.category && (
                <span className="complaint-category">
                  {complaint.category}
                </span>
              )}


              {/* Subject */}
              <h2>
                {complaint.subject}
              </h2>


              {/* AI Summary instead of full description */}
              <div className="admin-ai-summary">

                <strong>
                  Complaint Summary
                </strong>

                <p className="admin-complaint-description">
                  {adminDescription}
                </p>

              </div>


              {/* Location */}
              {complaint.location && (
                <div className="complaint-info-row">

                  <strong>
                    Location:
                  </strong>

                  <span>
                    {complaint.location}
                  </span>

                </div>
              )}


              {/* Student ID */}
              <div className="complaint-info-row">

                <strong>
                  Student ID:
                </strong>

                <span>
                  {complaint.studentId}
                </span>

              </div>


              {/* AI Department */}
              {complaint.department && (
                <div className="complaint-info-row">

                  <strong>
                    Department:
                  </strong>

                  <span>
                    {complaint.department}
                  </span>

                </div>
              )}


              {/* Resolve */}
              {!isResolved && (
                <button
                  className="resolve-button"
                  onClick={() =>
                    updateComplaintStatus(
                      complaint.id
                    )
                  }
                  disabled={isSaving}
                >
                  {isSaving
                    ? "Updating..."
                    : "Resolve ✅"}
                </button>
              )}


              {/* Admin Message */}
              <div className="admin-suggestion-box">

                <label>
                  Message to Student
                </label>


                <textarea
                  value={
                    suggestions[complaint.id] || ""
                  }
                  onChange={(e) =>
                    setSuggestions((current) => ({
                      ...current,
                      [complaint.id]:
                        e.target.value,
                    }))
                  }
                  placeholder="Write a response or suggestion..."
                  rows="3"
                  disabled={isSaving}
                />


                <button
                  className="save-suggestion-button"
                  onClick={() =>
                    saveMessage(complaint.id)
                  }
                  disabled={isSaving}
                >
                  {isSaving
                    ? "Saving..."
                    : "Save Message"}
                </button>

              </div>


              {/* Existing Admin Response */}
              {complaint.adminSuggestion && (
                <div className="saved-suggestion">

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
              <div className="admin-complaint-date">

                Submitted:{" "}

                {formatDateTime(
                  complaint.createdAt
                )}

              </div>


              {/* Updated Date */}
              {complaint.updatedAt && (
                <div className="admin-updated-date">

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

export default AdminComplaint;