// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import AssignDrivers from "./pages/AssignDrivers";
// import HomePage from "./pages/Homepage";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="Homepage /"
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/assign-drivers" element={<AssignDrivers />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AssignDrivers from "./pages/AssignDrivers";
import CreateSchoolAdmin from "./pages/CreateSchoolAdmin";
import CreateSchool from "./pages/CreateSchool";
import DriverActivity from "./pages/DriverActivity";
import ManageSchools from "./pages/ManageSchools";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Homepage route */}

        {/* ✅ Login as root route */}
        <Route path="/" element={<Login />} />

        {/* ✅ Other routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assign-drivers" element={<AssignDrivers />} />
        <Route path="/create-school-admin" element={<CreateSchoolAdmin />} />
        <Route path="/create-school" element={<CreateSchool />} />
<Route path="/driver/:driverId/activity" element={<DriverActivity />} />
          <Route path="/manage-schools" element={<ManageSchools />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
