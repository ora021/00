// src/components/Login.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/images/login.svg";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Logged in successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  //
  return (
    <div className="container py-5">
      <div className="row justify-content-between align-items-center">
        <div className="col-lg-5 col-12">
          <h2>Login</h2>
          <p className="fs-6 my-3">Login to access your travelwise account</p>
          {loading && <div>Loading...</div>}
          {error && <div className="error">{error}</div>}
          {successMessage && <div className="success">{successMessage}</div>}
          <form className="mt-5" onSubmit={handleLogin}>
            <div className="input-holder">
              <label htmlFor="">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="input-holder">
              <label htmlFor="">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <hr />
            <button className="login-btn" type="submit" disabled={loading}>
              Login
            </button>
            <p className="text-center mt-4">
              dont have an account ? <Link to="/signup">SignUp</Link>
            </p>
          </form>
        </div>
        <div className="col-lg-5 col-12">
          {" "}
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
