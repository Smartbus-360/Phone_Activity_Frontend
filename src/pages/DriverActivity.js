// import React, { useEffect, useState } from "react";
// import { Table, Card, message } from "antd";
// import { useParams } from "react-router-dom";
// import API from "../api/axios";

// export default function DriverActivity() {
//   const { driverId } = useParams();
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     fetchActivity();
//   }, []);

//   const fetchActivity = async () => {
//     try {
//       const res = await API.get(`/drivers/${driverId}/activity`);
//       setLogs(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//       message.error("Failed to fetch driver activity");
//     }
//   };

//   const columns = [
//     { title: "Battery", dataIndex: "battery" },
//     { title: "Screen State", dataIndex: "screen_state" },
//     { title: "Foreground App", dataIndex: "foreground_app" },
//     { title: "Data Usage (MB)", dataIndex: "data_usage_mb" },
//     { title: "Timestamp", dataIndex: "created_at" },
//   ];

//   return (
//     <Card title={`Driver Activity Log (ID: ${driverId})`}>
//       <Table dataSource={logs} columns={columns} rowKey="id" />
//     </Card>
//   );
// }

// src/pages/DriverActivity.js
import React, { useEffect, useState } from "react";
import { Table, Card, Button, message, Spin } from "antd";
import API from "../api/axios";

export default function DriverActivity() {
  const [drivers, setDrivers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all drivers when page loads
  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/drivers"); // backend already supports filtering by role
      setDrivers(res.data.data || []);
    } catch (err) {
      console.error(err);
      message.error("Failed to load drivers");
    }
    setLoading(false);
  };

  // ✅ Fetch activity for selected driver
  const fetchDriverActivity = async (driverId) => {
    setLoading(true);
    try {
      const res = await API.get(`/drivers/${driverId}/activity`);
      setLogs(res.data.data || []);
      setSelectedDriver(driverId);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch driver activity");
    }
    setLoading(false);
  };

  // ✅ Table for drivers
  const driverColumns = [
    { title: "Driver ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Username", dataIndex: "username", key: "username" },
    {
      title: "School",
      render: (record) => record.School?.name || "N/A",
    },
    {
      title: "Action",
      render: (record) => (
        <Button type="link" onClick={() => fetchDriverActivity(record.id)}>
          View Activity
        </Button>
      ),
    },
  ];

  // ✅ Table for driver’s activities
  const activityColumns = [
    { title: "Battery", dataIndex: "battery", key: "battery" },
    { title: "Screen State", dataIndex: "screen_state", key: "screen_state" },
    { title: "Foreground App", dataIndex: "foreground_app", key: "foreground_app" },
    { title: "Data Usage (MB)", dataIndex: "data_usage_mb", key: "data_usage_mb" },
    { title: "Institute", dataIndex: "institute_name", key: "institute_name" },
    { title: "Timestamp", dataIndex: "created_at", key: "created_at" },
  ];

  return (
    <div style={{ padding: 20 }}>
      {loading ? (
        <Spin />
      ) : !selectedDriver ? (
        <Card title="All Drivers" bordered>
          <Table
            columns={driverColumns}
            dataSource={drivers}
            rowKey="id"
            pagination={{ pageSize: 8 }}
          />
        </Card>
      ) : (
        <Card
          title={`Activity Logs for Driver ID: ${selectedDriver}`}
          extra={
            <Button onClick={() => setSelectedDriver(null)} type="default">
              ← Back to Drivers
            </Button>
          }
        >
          <Table
            columns={activityColumns}
            dataSource={logs}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      )}
    </div>
  );
}

