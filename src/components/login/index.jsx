import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Firebase Authentication modülü
import firebaseConfig from "../../config/firebaseConfig"; // Firebase yapılandırma dosyası
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import "./index.scss";

initializeApp(firebaseConfig);

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const currentUser = sessionStorage.getItem("user");
      if (currentUser) {
        setUsername(currentUser);
        navigate("/");
      }
    };

    checkUser();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, username, password);
      sessionStorage.setItem("user", username);
      navigate("/");
      setLoginError(false);
    } catch (error) {
      console.error("Login failed. Error:", error.message);
      setLoginError(true);
    } finally {
      setLoading(false);
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
            <Button
              variant="primary"
              type="submit"
              disabled={
                loading || password.trim() === "" || username.trim() === ""
              }
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Loading...
                </>
              ) : (
                <>Submit</>
              )}
            </Button>
          </div>
        </form>
        {loginError && <p className="error">Login failed. Please try again.</p>}
      </div>
    </div>
  );
}

export default Login;
