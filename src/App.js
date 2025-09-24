import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AssignDrivers from "./pages/AssignDrivers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assign-drivers" element={<AssignDrivers />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
