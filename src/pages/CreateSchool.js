// src/pages/CreateSchool.js
import React from "react";
import { Form, Input, Button, Card } from "antd";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateSchool() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await API.post("/schools", values);
      alert("✅ School created successfully");
      navigate("/dashboard");
    } catch (err) {
      alert("❌ Failed to create school");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"100vh" }}>
      <Card title="Create School" style={{ width: 400 }}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="name" label="School Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Create School
          </Button>
        </Form>
      </Card>
    </div>
  );
}
