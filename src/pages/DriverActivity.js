import React, { useEffect, useState } from "react";
import { Table, Card, message } from "antd";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function DriverActivity() {
  const { driverId } = useParams();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    try {
      const res = await API.get(`/drivers/${driverId}/activity`);
      setLogs(res.data.data || []);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch driver activity");
    }
  };

  const columns = [
    { title: "Battery", dataIndex: "battery" },
    { title: "Screen State", dataIndex: "screen_state" },
    { title: "Foreground App", dataIndex: "foreground_app" },
    { title: "Data Usage (MB)", dataIndex: "data_usage_mb" },
    { title: "Timestamp", dataIndex: "created_at" },
  ];

  return (
    <Card title={`Driver Activity Log (ID: ${driverId})`}>
      <Table dataSource={logs} columns={columns} rowKey="id" />
    </Card>
  );
}
