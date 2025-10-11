// // import React, { useEffect, useState } from "react";
// // import { Table, Card ,Button,Row,Col} from "antd";
// // import { useNavigate } from "react-router-dom"; // ✅ Added useNavigate
// // import API from "../api/axios";

// // export default function Dashboard() {
// //   // const [logs, setLogs] = useState([]);
// //   // const navigate = useNavigate();

// //   // useEffect(() => {
// //   //   fetchLogs();
// //   // }, []);

// //   // const fetchLogs = async () => {
// //   //   try {
// //   //     const res = await API.get("/activity");
// //   //     setLogs(res.data.data);
// //   //   } catch (err) {
// //   //     console.error(err);
// //   //   }
// //   // };
// //   const navigate = useNavigate();
// // //   const [drivers, setDrivers] = useState([]);
// // // const [selectedDriver, setSelectedDriver] = useState(null);
// // // const [logs, setLogs] = useState([]);
// //     const role = localStorage.getItem("role");


// // useEffect(() => {
// //   fetchDrivers();
// // }, []);

// // const fetchDrivers = async () => {
// //   try {
// //     const res = await API.get("/drivers");  // ✅ new API
// //     setDrivers(res.data);
// //   } catch (err) {
// //     console.error(err);
// //   }
// // };

// // const fetchLogs = async (driverId) => {
// //   try {
// //     const res = await API.get(`/drivers/${driverId}/activity`);  // ✅ new API
// //     setLogs(res.data.data);
// //     setSelectedDriver(driverId);
// //   } catch (err) {
// //     console.error(err);
// //   }
// // };

// //     const handleLogout = () => {
// //     // ✅ Clear token from localStorage
// //     localStorage.removeItem("token");

// //     // ✅ Redirect to login page
// //     navigate("/");
// //   };


// //   // const columns = [
// //   //   { title: "Driver", dataIndex: ["Driver", "name"], key: "driver" },
// //   //   { title: "Battery", dataIndex: "battery", key: "battery" },
// //   //   { title: "Screen", dataIndex: "screen_state", key: "screen" },
// //   //   { title: "App", dataIndex: "foreground_app", key: "app" },
// //   //   { title: "Data Usage (MB)", dataIndex: "data_usage_mb", key: "data" },
// //   //   { title: "Time", dataIndex: "created_at", key: "time" },
// //   // ];
// //   const driverColumns = [
// //   { title: "Driver ID", dataIndex: "id", key: "id" },
// //   { title: "Name", dataIndex: "name", key: "name" },
// //   { title: "Username", dataIndex: "username", key: "username" },
// //   {
// //     title: "Action",
// //     render: (driver) => (
// //       <Button type="link" onClick={() => fetchLogs(driver.id)}>
// //         View Activity
// //       </Button>
// //     ),
// //   },
// // ];

// // const logColumns = [
// //   { title: "Battery", dataIndex: "battery", key: "battery" },
// //   { title: "Screen", dataIndex: "screen_state", key: "screen" },
// //   { title: "App", dataIndex: "foreground_app", key: "app" },
// //   { title: "Data Usage (MB)", dataIndex: "data_usage_mb", key: "data" },
// //   { title: "Time", dataIndex: "created_at", key: "time" },
// // ];


// //   return (
// //     <Card
// //       title="Phone Activity Logs"
// //       extra={
// //         <>
// //         <Button type="primary" onClick={() => navigate("/assign-drivers")}>
// //           Assign Drivers
// //         </Button>
// //               <Button style={{ marginLeft: 10 }} onClick={() => navigate("/create-school")}>
// //         Create School
// //       </Button>
// //         <Button style={{ marginLeft: 10 }} onClick={() => navigate("/create-school-admin")}>
// //         Create School Admin
// //       </Button>
// //       <Button danger style={{ marginLeft: 10 }} onClick={handleLogout}>
// //             Logout
// //           </Button>

// //       </>
// //       }
// //     >
// // {/* <Table dataSource={logs} columns={columns} rowKey="id" /> */}
// //       {!selectedDriver ? (
// //   <Table dataSource={drivers} columns={driverColumns} rowKey="id" />
// // ) : (
// //   <>
// //     <Button onClick={() => setSelectedDriver(null)}>⬅ Back to Drivers</Button>
// //     <Table dataSource={logs} columns={logColumns} rowKey="id" />
// //   </>
// // )}
// //     </Card>


// // src/pages/Dashboard.js
// import React from "react";
// import { Card, Button, Row, Col } from "antd";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const role = localStorage.getItem("role");

//   return (
//     <div style={{ padding: 40 }}>
//       <h1 style={{ textAlign: "center", marginBottom: 30 }}>
//         {role === "superadmin" ? "Superadmin Dashboard" : "School Admin Dashboard"}
//       </h1>

//       <Row gutter={[20, 20]} justify="center">
//         {/* ✅ Superadmin specific cards */}
//         {role === "superadmin" && (
//           <>
//             <Col>
//               <Card title="Manage Schools & Admins" style={{ width: 260 }}>
//                 <p>View, add, or delete schools and their admins.</p>
//                 <Button type="primary" onClick={() => navigate("/manage-schools")}>
//                   Open Page
//                 </Button>
//               </Card>
//             </Col>
//           </>
//         )}

//         {/* ✅ Shared card (visible to both Superadmin and School Admin) */}
//         <Col>
//           <Card title="Manage Drivers" style={{ width: 260 }}>
//             <p>View, assign, or register drivers for your school.</p>
//             <Button type="primary" onClick={() => navigate("/assign-drivers")}>
//               Manage Drivers
//             </Button>
//           </Card>
//         </Col>

//         <Col>
//           <Card title="Driver Activities" style={{ width: 260 }}>
//             <p>View live activity logs of drivers.</p>
//             <Button type="primary" onClick={() => navigate("/activity")}>
//               View Activities
//             </Button>
//           </Card>
//         </Col>
//       </Row>

//       <div style={{ textAlign: "center", marginTop: 40 }}>
//         <Button
//           danger
//           onClick={() => {
//             localStorage.removeItem("token");
//             navigate("/");
//           }}
//         >
//           Logout
//         </Button>
//       </div>
//     </div>
//   );
// }

// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const [schoolInfo, setSchoolInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🏫 Load school info if school admin
  useEffect(() => {
    if (role === "schooladmin") fetchMySchool();
  }, []);

  const fetchMySchool = async () => {
    try {
      setLoading(true);
      const res = await API.get("/my-school"); // backend route for schooladmin
      setSchoolInfo(res.data.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load school info");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>
        {role === "superadmin"
          ? "Super Admin Dashboard"
          : "School Admin Dashboard"}
      </h1>

      <Row gutter={[20, 20]} justify="center">
        {/* 🧩 SUPER ADMIN CARDS */}
        {role === "superadmin" && (
          <>
            <Col>
              <Card title="🏫 Manage Schools & Admins" style={{ width: 280 }}>
                <p>View, add, or update schools and their admins.</p>
                <Button
                  type="primary"
                  onClick={() => navigate("/manage-schools")}
                  block
                >
                  Open Page
                </Button>
              </Card>
            </Col>
          </>
        )}

        {/* 🧩 SCHOOL ADMIN CARD — My School Info */}
        {role === "schooladmin" && (
          <Col>
            <Card
              title="🏫 My School Information"
              style={{ width: 280 }}
              loading={loading}
            >
              {schoolInfo ? (
                <>
                  <p>
                    <strong>Name:</strong> {schoolInfo.name}
                  </p>
                  {schoolInfo.address && (
                    <p>
                      <strong>Address:</strong> {schoolInfo.address}
                    </p>
                  )}
                  <p>
                    <strong>ID:</strong> {schoolInfo.id}
                  </p>
                  <Button onClick={fetchMySchool} block>
                    Refresh
                  </Button>
                </>
              ) : (
                <Spin />
              )}
            </Card>
          </Col>
        )}

        {/* 🧩 COMMON CARDS */}
        <Col>
          <Card title="🚌 Manage Drivers" style={{ width: 280 }}>
            <p>View or register drivers for your school.</p>
            <Button
              type="primary"
              onClick={() => navigate("/assign-drivers")}
              block
            >
              Manage Drivers
            </Button>
          </Card>
        </Col>

        <Col>
          <Card title="📱 Driver Activities" style={{ width: 280 }}>
            <p>View live activity logs of drivers.</p>
            <Button
              type="primary"
              onClick={() => navigate("/activity")}
              block
            >
              View Activities
            </Button>
          </Card>
        </Col>
      </Row>

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <Button danger onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

