import { useState } from "react";
import "./RaiseComplaint.css";
import API_URL from "./api";

function RaiseComplaint({ onBack }) {
  const [complaintType, setComplaintType] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [photoUrl, setPhotoUrl] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    const token = localStorage.getItem("studentToken");

    if (!token) {
      setMessage("Please login again.");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/complaints/raise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          complaintType: complaintType,
          category: category,
          subject: subject,
          description: description,
          location: location,
          priority: priority,
          photoUrl: photoUrl,
        }),
      });

      const result = await response.text();

      if (response.ok) {
        setMessage("Complaint submitted successfully!");
        setMessageType("success");

        setComplaintType("");
        setCategory("");
        setSubject("");
        setDescription("");
        setLocation("");
        setPriority("MEDIUM");
        setPhotoUrl("");
      } else {
        setMessage(result || "Unable to submit complaint.");
        setMessageType("error");
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to connect to server. Make sure Spring Boot is running."
      );

      setMessageType("error");
    }
  };

  return (
    <div className="complaint-page">

      <div className="complaint-card">

        <h1>Report Campus Issue</h1>

        <p className="complaint-subtitle">
          Report a campus issue and help us improve your campus experience.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Complaint Type */}
          <label>
            Complaint Type <span>*</span>
          </label>

          <select
            value={complaintType}
            onChange={(e) => setComplaintType(e.target.value)}
            required
          >
            <option value="">Select complaint type</option>
            <option value="CAMPUS_ISSUE">
              Campus Issue
            </option>
            <option value="CANTEEN_SHOP">
              Canteen / Shop Issue
            </option>
          </select>


          {/* Category */}
          <label>
            Category <span>*</span>
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>

            <option value="Water Supply">
              Water Supply
            </option>

            <option value="Cleanliness">
              Cleanliness
            </option>

            <option value="Smart Board">
              Smart Board
            </option>

            <option value="Fan / AC">
              Fan / AC
            </option>

            <option value="Drinking Water">
              Drinking Water
            </option>

            <option value="Electricity">
              Electricity
            </option>

            <option value="Classroom">
              Classroom
            </option>

            <option value="Washroom">
              Washroom
            </option>

            <option value="Overcharging">
              Overcharging
            </option>

            <option value="Expired Product">
              Expired / Outdated Product
            </option>

            <option value="Poor Quality">
              Poor Quality
            </option>

            <option value="Hygiene Issue">
              Hygiene Issue
            </option>

            <option value="Wrong Billing">
              Wrong Billing
            </option>

            <option value="Other">
              Other
            </option>
          </select>


          {/* Subject */}
          <label>
            Subject <span>*</span>
          </label>

          <input
            type="text"
            placeholder="Enter complaint subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />


          {/* Description */}
          <label>
            Description <span>*</span>
          </label>

          <textarea
            placeholder="Describe your problem in detail"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="6"
          />


          {/* Location */}
          <label>
            Location <span>*</span>
          </label>

          <input
            type="text"
            placeholder="Example: Block A, Room 204"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />


          {/* Priority */}
          <label>
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="LOW">
              Low
            </option>

            <option value="MEDIUM">
              Medium
            </option>

            <option value="HIGH">
              High
            </option>
          </select>


          {/* Photo / Evidence */}
          <label>
            Photo / Evidence URL
            <span className="optional">
              (Optional)
            </span>
          </label>

          <input
            type="url"
            placeholder="Paste image URL if available"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />


          {/* Submit */}
          <button type="submit">
            Submit Complaint
          </button>

        </form>


        {/* Message */}
        {message && (
          <p className={messageType}>
            {message}
          </p>
        )}


        {/* Back */}
        <button
          className="back-button"
          onClick={onBack}
        >
          Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default RaiseComplaint;