// LoginPage.js

import React, { useState } from "react";
import axios from "axios";
import "../Login/LoginPage.css"; // Import the CSS file
import { Link } from "react-router-dom"; // Import the Link component from React Router


const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleCreateAccount = async () => {
    try {
      // Perform basic form validation
      if (!username || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      // Send a request to your backend server to create a new user
      const response = await axios.post("http://localhost:5555/api/register", {
        username,
        email,
        password,
      });

      // If successful, route to the main app
      if (response.data.success) {
        window.location.href = "/login"; // Replace with appropriate route for your app
      } else {
        alert("Failed to create an account.");
      }
    } catch (error) {
      console.error("Error creating an account:", error);
    }
  };
  const handleSignIn = () => {
    // Redirect to LoginPage.js when login button is clicked
    window.location.href = '/login';
  };


  return (
    <div className="container">
      <div className="signup-form">
        <h1 className="title">Sign Up</h1>
        <form className="form-container">
          <div className="input-field">
            <input
              type="input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button
              type="button"
              className="create-account"
              onClick={handleCreateAccount}
            >
              Create Account
            </button>
          </div>

        </form>
 
        <label className="label">Already have an account?</label>
        <Link to = "/login" className="log-in" > Log in </Link>
      </div>
    </div>
  );
};

export default CreateAccount;