import React, { useEffect, useState } from "react";
import { Table, Card, Select, message, Spin } from "antd";
import API from "../api/axios";

export default function AssignDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch unassigned drivers & schools
  useEffect(() => {
    fetchUnassignedDrivers();
    fetchSchools();
  }, []);

  const fetchUnassignedDrivers = async () => {
    try {
      const res = await API.get("/drivers/unassigned");
      setDrivers(res.data.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load drivers");
    }
  };

  const fetchSchools = async () => {
    try {
      const res = await API.get("/schools"); // backend must expose this
      setSchools(res.data.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load schools");
    }
  };

  const handleAssign = async (driverId, schoolId) => {
    setLoading(true);
    try {
      await API.put(`/drivers/${driverId}/assign`, { school_id: schoolId });
      message.success("✅ Driver assigned successfully");
      fetchUnassignedDrivers(); // refresh list
    } catch (err) {
      console.error(err);
      message.error("❌ Error assigning driver");
    }
    setLoading(false);
  };

  const columns = [
  { title: "Driver Name", dataIndex: "name", key: "name" },
  { title: "Device ID", dataIndex: "device_id", key: "device_id" },
  { title: "School ID", dataIndex: "school_id", key: "school_id" }, // ✅ Show current school_id
  {
    title: "Assign to School",
    render: (_, record) => (
      <Select
        placeholder="Select School"
        style={{ width: 200 }}
        onChange={(schoolId) => handleAssign(record.id, schoolId)}
      >
        {schools.map((s) => (
          <Select.Option key={s.id} value={s.id}>
            {s.name} (ID: {s.id})
          </Select.Option>
        ))}
      </Select>

      ),
    },
  ];

  return (
    <Card title="Unassigned Drivers">
      {loading ? (
        <Spin />
      ) : (
        <Table dataSource={drivers} columns={columns} rowKey="id" />
      )}
    </Card>
  );
}
