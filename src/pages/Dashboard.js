import React, { useEffect, useState } from "react";
import { Table, Card ,Button} from "antd";
import { useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import API from "../api/axios";

export default function Dashboard() {
  // const [logs, setLogs] = useState([]);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   fetchLogs();
  // }, []);

  // const fetchLogs = async () => {
  //   try {
  //     const res = await API.get("/activity");
  //     setLogs(res.data.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
const [selectedDriver, setSelectedDriver] = useState(null);
const [logs, setLogs] = useState([]);

useEffect(() => {
  fetchDrivers();
}, []);

const fetchDrivers = async () => {
  try {
    const res = await API.get("/drivers");  // ✅ new API
    setDrivers(res.data);
  } catch (err) {
    console.error(err);
  }
};

const fetchLogs = async (driverId) => {
  try {
    const res = await API.get(`/drivers/${driverId}/activity`);  // ✅ new API
    setLogs(res.data.data);
    setSelectedDriver(driverId);
  } catch (err) {
    console.error(err);
  }
};

    const handleLogout = () => {
    // ✅ Clear token from localStorage
    localStorage.removeItem("token");

    // ✅ Redirect to login page
    navigate("/");
  };


  // const columns = [
  //   { title: "Driver", dataIndex: ["Driver", "name"], key: "driver" },
  //   { title: "Battery", dataIndex: "battery", key: "battery" },
  //   { title: "Screen", dataIndex: "screen_state", key: "screen" },
  //   { title: "App", dataIndex: "foreground_app", key: "app" },
  //   { title: "Data Usage (MB)", dataIndex: "data_usage_mb", key: "data" },
  //   { title: "Time", dataIndex: "created_at", key: "time" },
  // ];
  const driverColumns = [
  { title: "Driver ID", dataIndex: "id", key: "id" },
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Username", dataIndex: "username", key: "username" },
  {
    title: "Action",
    render: (driver) => (
      <Button type="link" onClick={() => fetchLogs(driver.id)}>
        View Activity
      </Button>
    ),
  },
];

const logColumns = [
  { title: "Battery", dataIndex: "battery", key: "battery" },
  { title: "Screen", dataIndex: "screen_state", key: "screen" },
  { title: "App", dataIndex: "foreground_app", key: "app" },
  { title: "Data Usage (MB)", dataIndex: "data_usage_mb", key: "data" },
  { title: "Time", dataIndex: "created_at", key: "time" },
];


  return (
    <Card
      title="Phone Activity Logs"
      extra={
        <>
        <Button type="primary" onClick={() => navigate("/assign-drivers")}>
          Assign Drivers
        </Button>
              <Button style={{ marginLeft: 10 }} onClick={() => navigate("/create-school")}>
        Create School
      </Button>
        <Button style={{ marginLeft: 10 }} onClick={() => navigate("/create-school-admin")}>
        Create School Admin
      </Button>
      <Button danger style={{ marginLeft: 10 }} onClick={handleLogout}>
            Logout
          </Button>

      </>
      }
    >
      // <Table dataSource={logs} columns={columns} rowKey="id" />
      {!selectedDriver ? (
  <Table dataSource={drivers} columns={driverColumns} rowKey="id" />
) : (
  <>
    <Button onClick={() => setSelectedDriver(null)}>⬅ Back to Drivers</Button>
    <Table dataSource={logs} columns={logColumns} rowKey="id" />
  </>
)}

    </Card>

  );
}
