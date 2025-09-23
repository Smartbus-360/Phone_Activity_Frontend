import React, { useEffect, useState } from "react";
import { Table, Card } from "antd";
import API from "../api/axios";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await API.get("/activity");
      setLogs(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { title: "Driver", dataIndex: ["Driver", "name"], key: "driver" },
    { title: "Battery", dataIndex: "battery", key: "battery" },
    { title: "Screen", dataIndex: "screen_state", key: "screen" },
    { title: "App", dataIndex: "foreground_app", key: "app" },
    { title: "Data Usage (MB)", dataIndex: "data_usage_mb", key: "data" },
    { title: "Time", dataIndex: "created_at", key: "time" },
  ];

  return (
    <Card title="Phone Activity Logs">
      <Table dataSource={logs} columns={columns} rowKey="id" />
    </Card>
  );
}
