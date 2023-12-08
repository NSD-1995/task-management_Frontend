import React, { useState } from "react";
import axios from "axios";
import "../css/RegistrationComponent.css";
import { Link } from "react-router-dom";

const RegistrationComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3001/register", {
        username,
        password,
      });
      console.log("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error.response.data.error);
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
      <button onClick={handleRegister}>Register</button>
      </div>

      {!username && !password ? (
        ""
      ) : (
        <Link to="/login" className="link-to-tasks">
          Login
        </Link>
      )}
      <Link to="/" className="link-to-tasks">
        Login
      </Link>
    </div>
  );
};

export default RegistrationComponent;
