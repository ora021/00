// src/components/Signup.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import img from "../assets/images/signup.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Account created successfully!");
      // Redirect user to the home page or do other necessary actions
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-between align-items-center">
        <div className="col-lg-5 col-12">
          <h2>Sign Up</h2>
          {loading && <div>Loading...</div>}
          {error && <div className="error">{error}</div>}
          {successMessage && <div className="success">{successMessage}</div>}
          <form onSubmit={handleSignup}>
            <div className="input-holder">
              <label htmlFor="Email">Email</label>
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

            <button className="login-btn" type="submit" disabled={loading}>
              Sign Up
            </button>
            <hr />
            <p className="text-center">
              Already have an account? <a href="/login"> Login</a>
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

export default Signup;
