// src/pages/CreateSchoolAdmin.js
import React from "react";
import { Form, Input, Button, Card, Select } from "antd";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateSchoolAdmin() {
  const [loading, setLoading] = React.useState(false);
  const [schools, setSchools] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const res = await API.get("/schools");
      setSchools(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = { ...values, role: "schooladmin" };
      await API.post("/school-admins", payload);
      alert("✅ School admin created successfully");
      navigate("/dashboard");
    } catch (err) {
      alert("❌ Failed to create school admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"100vh" }}>
      <Card title="Create School Admin" style={{ width: 400 }}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="school_id" label="Select School" rules={[{ required: true }]}>
            <Select placeholder="Choose a school">
              {schools.map(s => (
                <Select.Option key={s.id} value={s.id}>
                  {s.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Create Admin
          </Button>
        </Form>
      </Card>
    </div>
  );
}
