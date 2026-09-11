import { useState } from "react";
import "./StudentAuth.css";
import API_URL from "./api";
import StudentDashboard from "./StudentDashboard";

function StudentAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("studentToken")
  );

  const [formData, setFormData] = useState({
    name: "",
    admissionNumber: "",
    email: "",
    phone: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (value) => {
    if (
      value.length < 8 ||
      !/[A-Z]/.test(value) ||
      !/[a-z]/.test(value) ||
      !/[0-9]/.test(value) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(value)
    ) {
      setPasswordError("Invalid password");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (passwordError || formData.password.length === 0) {
      setPasswordError("Please enter a valid password.");
      return;
    }

    try {
      // =========================
      // LOGIN
      // =========================
      if (isLogin) {
        const response = await fetch(`${API_URL}/students/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          }),
        });

        const result = await response.text();

        if (!response.ok) {
          setMessage(
            result || `Login failed. Server returned ${response.status}`
          );
          setMessageType("error");
          return;
        }

        if (result.startsWith("eyJ")) {
          localStorage.setItem("studentToken", result);
          setLoggedIn(true);
        } else {
          setMessage(result || "Invalid email/phone or password");
          setMessageType("error");
        }
      }

      // =========================
      // REGISTER
      // =========================
      else {
        const response = await fetch(`${API_URL}/students/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            admissionNumber: formData.admissionNumber,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          }),
        });

        const result = await response.text();

        if (response.ok) {
          setMessage("Student registration successful!");
          setMessageType("success");

          setIsLogin(true);

          setFormData({
            name: "",
            admissionNumber: "",
            email: formData.email,
            phone: formData.phone,
            password: "",
          });

          setPasswordError("");
        } else {
          setMessage(
            result || `Registration failed. Server returned ${response.status}`
          );
          setMessageType("error");
        }
      }
    } catch (error) {
      console.error("Request error:", error);

      setMessage(
        "Unable to connect to server. Make sure Spring Boot is running."
      );
      setMessageType("error");
    }
  };

  const switchMode = () => {
    setIsLogin((prev) => !prev);

    setFormData({
      name: "",
      admissionNumber: "",
      email: "",
      phone: "",
      password: "",
    });

    setPasswordError("");
    setMessage("");
    setMessageType("");
  };

  if (loggedIn) {
    return <StudentDashboard />;
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>
          Student {isLogin ? "Login" : "Register"}
        </h1>

        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <>
              <label>
                Full Name <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label>
                Admission Number <span>*</span>
              </label>

              <input
                type="text"
                name="admissionNumber"
                placeholder="Enter admission number"
                value={formData.admissionNumber}
                onChange={handleChange}
                required
              />
            </>
          )}

          <label>
            Gmail <span>*</span>
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter Gmail"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>
            Mobile Number <span>*</span>
          </label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter 10-digit mobile number"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit mobile number"
            required
          />

          <div className="password-field">

            <label>
              Password <span>*</span>
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className="password-tooltip">
              <strong>Password must contain:</strong>

              <ul>
                <li>At least 8 characters</li>
                <li>One uppercase letter (A-Z)</li>
                <li>One lowercase letter (a-z)</li>
                <li>One number (0-9)</li>
                <li>One special symbol (@, #, $, %, etc.)</li>
              </ul>
            </div>

          </div>

          {passwordError && (
            <p className="password-error">
              Please enter a valid password.
            </p>
          )}

          <button type="submit">
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        {message && (
          <p className={messageType}>
            {message}
          </p>
        )}

        <p>
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>

        <button
          type="button"
          className="switch-button"
          onClick={switchMode}
        >
          {isLogin ? "Register here" : "Login here"}
        </button>

      </div>
    </div>
  );
}

export default StudentAuth;