// LoginPage.js

import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css"; // Import the CSS file
import { useHistory, Link } from "react-router-dom";
import Navbar from "../Default/Navbar";
import { toast } from "react-toastify";



const LoginPage = () => {

  const history = useHistory();
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError]= useState('');


  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!username || !password) {
     // alert("Please fill in all fields.");
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5555/api/loginAuth", { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userID);
      localStorage.setItem('userName', response.data.userName);
      localStorage.setItem('loadedSets', JSON.stringify(response.data.flashcardsetIDs));
      console.log(localStorage.getItem('loadedSets'));
      alert(response.data.userName)
        history.push("/users");
    } catch (error) {
      setError('Invalid username or password');
    }
  };


  return (
    <div className="container">
      <Navbar/>
      <div className="login-form">
        <h1 className="title">Login</h1>
        <form className="form-container">
          <div className="input-field">
            <input
              type="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button type="button" className="signin" onClick={handleSignIn}>
              Sign In
            </button>
          </div>
          {error && <p>{error}</p>}
        </form>
        {/* Add a link to the CreateAccount.js component */}

        <label className="label">Don't have an account?</label>
        <Link to = "/signup" className="sign-up" > Sign up </Link>

      </div>
    </div>
  );
};

export default LoginPage;