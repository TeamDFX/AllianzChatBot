import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Firebase Authentication modülü
import firebaseConfig from "../../config/firebaseConfig"; // Firebase yapılandırma dosyası

import "./index.scss";

initializeApp(firebaseConfig);

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, username, password);
      navigate("/");
      sessionStorage.setItem("user", username);
      setLoginError(false);
    } catch (error) {
      console.error("Login failed. Error:", error.message);
      setLoginError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit">Submit</button>
          </div>
        </form>
        {loginError && <p className="error">Login failed. Please try again.</p>}
      </div>
    </div>
  );
}

export default Login;
