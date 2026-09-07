import { useState } from "react";
import "./LostFound.css";
import API_URL from "./api";

function LostFound({ onBack }) {
  const [type, setType] = useState("");
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
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
      const response = await fetch(`${API_URL}/lost-found/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: type,
          itemName: itemName,
          category: category,
          location: location,
          date: date,
          description: description,
          photoUrl: photoUrl,
        }),
      });

      const result = await response.text();

      if (response.ok) {
        setMessage("Item reported successfully!");
        setMessageType("success");

        setType("");
        setItemName("");
        setCategory("");
        setLocation("");
        setDate("");
        setDescription("");
        setPhotoUrl("");
      } else {
        setMessage(result || "Unable to report item.");
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
    <div className="lost-found-page">
      <div className="lost-found-card">

        <h1>Lost & Found</h1>

        <p className="lost-found-subtitle">
          Report a lost item or help someone find their belongings.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Type */}
          <label>
            Report Type <span>*</span>
          </label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">
              Select type
            </option>

            <option value="LOST">
              I Lost an Item
            </option>

            <option value="FOUND">
              I Found an Item
            </option>
          </select>

          {/* Item Name */}
          <label>
            Item Name <span>*</span>
          </label>

          <input
            type="text"
            placeholder="Example: Black Wallet"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />

          {/* Category */}
          <label>
            Category <span>*</span>
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">
              Select category
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Documents">
              Documents / ID Card
            </option>

            <option value="Wallet">
              Wallet / Purse
            </option>

            <option value="Keys">
              Keys
            </option>

            <option value="Books">
              Books / Notes
            </option>

            <option value="Clothing">
              Clothing
            </option>

            <option value="Accessories">
              Accessories
            </option>

            <option value="Other">
              Other
            </option>
          </select>

          {/* Location */}
          <label>
            Location <span>*</span>
          </label>

          <input
            type="text"
            placeholder="Example: Block A, Ground Floor"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          {/* Date */}
          <label>
            Date <span>*</span>
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          {/* Description */}
          <label>
            Description <span>*</span>
          </label>

          <textarea
            placeholder="Describe the item and where it was lost/found..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            required
          />

          {/* Photo URL */}
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
            Submit Report
          </button>

        </form>

        {message && (
          <p className={messageType}>
            {message}
          </p>
        )}

        <button
          className="lost-found-back-button"
          onClick={onBack}
        >
          Back to Dashboard
        </button>

      </div>
    </div>
  );
}

export default LostFound;