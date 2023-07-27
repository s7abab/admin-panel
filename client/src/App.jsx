import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import AddUser from "./pages/auth/AddUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/adduser" element={<AddUser />} />
    </Routes>
  );
}

export default App;
