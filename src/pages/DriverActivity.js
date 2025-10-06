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
import { Table, Card, Button, message, Spin, Descriptions } from "antd";
import API from "../api/axios";

export default function DriverActivity() {
  const [drivers, setDrivers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [driverInfo, setDriverInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all drivers on load
  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/drivers");
      setDrivers(res.data.data || []);
    } catch (err) {
      console.error(err);
      message.error("Failed to load drivers");
    }
    setLoading(false);
  };

  // ✅ Fetch driver details + activities
  const fetchDriverActivity = async (driverId) => {
    setLoading(true);
    try {
      const res = await API.get(`/drivers/${driverId}/activity`);
      setDriverInfo(res.data.driver || null);
      setLogs(res.data.activity_logs || []);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch driver activity");
    }
    setLoading(false);
  };

  // ✅ Table for all drivers
  const driverColumns = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Username", dataIndex: "username" },
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

  // ✅ Columns for activities
  const activityColumns = [
    { title: "Battery", dataIndex: "battery" },
    { title: "Screen State", dataIndex: "screen_state" },
    { title: "Foreground App", dataIndex: "foreground_app" },
    { title: "Data Usage (MB)", dataIndex: "data_usage_mb" },
    { title: "Timestamp", dataIndex: "created_at" },
  ];

  return (
    <div style={{ padding: 20 }}>
      {loading ? (
        <Spin />
      ) : !driverInfo ? (
        <Card title="All Drivers">
          <Table
            columns={driverColumns}
            dataSource={drivers}
            rowKey="id"
            pagination={{ pageSize: 8 }}
          />
        </Card>
      ) : (
        <Card
          title={`Activity Logs for ${driverInfo.name}`}
          extra={
            <Button onClick={() => setDriverInfo(null)} type="default">
              ← Back to Drivers
            </Button>
          }
        >
          {/* ✅ Driver Details Section */}
          <Descriptions bordered column={1} size="small" style={{ marginBottom: 20 }}>
            <Descriptions.Item label="Name">{driverInfo.name}</Descriptions.Item>
            <Descriptions.Item label="Username">{driverInfo.username}</Descriptions.Item>
            <Descriptions.Item label="Institute">{driverInfo.institute_name || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="School">{driverInfo.school || "N/A"}</Descriptions.Item>
          </Descriptions>

          {/* ✅ Activity Table */}
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
