import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Saved from "./components/Saved";

const AppRouter = () => {
  const [user, setUser] = useState(null);
  console.log(user);
  useEffect(() => {
    const userF = auth.currentUser;
    if (userF) {
      setUser(userF);
    } else {
      console.log("faild for user");
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/saved" element={<Saved user={user} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
