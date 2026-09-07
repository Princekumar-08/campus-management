import { useState } from "react";
import "./AdminAuth.css";
import API_URL from "./api";
import AdminDashboard from "./AdminDashboard";

function AdminAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("adminToken")
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const validatePassword = (value) => {
    if (
      value.length < 8 ||
      !/[A-Z]/.test(value) ||
      !/[a-z]/.test(value) ||
      !/[0-9]/.test(value) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(value)
    ) {
      setPasswordError("Please enter a valid password.");
    } else {
      setPasswordError("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (
      !formData.password ||
      formData.password.length < 8 ||
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    ) {
      setPasswordError("Please enter a valid password.");
      return;
    }

    try {
      if (isLogin) {
        // ADMIN LOGIN

        const response = await fetch(`${API_URL}/admins/login`, {
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

        if (result.startsWith("eyJ")) {
          localStorage.setItem("adminToken", result);
          setLoggedIn(true);
        } else {
          setMessage(result);
          setMessageType("error");
        }
      } else {
        // ADMIN REGISTRATION

        const response = await fetch(`${API_URL}/admins/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          }),
        });

        const result = await response.text();

        if (response.ok) {
          setMessage("Admin registration successful!");
          setMessageType("success");

          setIsLogin(true);

          setFormData({
            name: "",
            email: formData.email,
            phone: formData.phone,
            password: "",
          });

          setPasswordError("");
        } else {
          setMessage(result);
          setMessageType("error");
        }
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to connect to server. Make sure Spring Boot is running."
      );

      setMessageType("error");
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);

    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
    });

    setPasswordError("");
    setMessage("");
    setMessageType("");
  };

  if (loggedIn) {
    return <AdminDashboard />;
  }

  return (
    <div className="admin-auth-page">

      <div className="admin-auth-card">

        <h1>
          Admin {isLogin ? "Login" : "Register"}
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

          <div className="admin-password-field">

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

            <div className="admin-password-tooltip">

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
            <p className="admin-password-error">
              {passwordError}
            </p>
          )}

          <button
            type="submit"
            className="admin-submit-button"
          >
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        {message && (
          <p className={messageType}>
            {message}
          </p>
        )}

        <p className="admin-switch-text">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>

        <button
          className="admin-switch-button"
          onClick={switchMode}
        >
          {isLogin ? "Register here" : "Login here"}
        </button>

      </div>

    </div>
  );
}

export default AdminAuth;