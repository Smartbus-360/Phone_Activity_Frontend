// src/pages/ManageSchools.js
import React, { useEffect, useState } from "react";
import { Table, Card, Button, Modal, Form, Input, Select, message, Space, Popconfirm, Spin } from "antd";
import API from "../api/axios";

export default function ManageSchools() {
  const [schools, setSchools] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSchoolModal, setIsSchoolModal] = useState(false);
  const [isAdminModal, setIsAdminModal] = useState(false);
  const [form] = Form.useForm();
  const [adminForm] = Form.useForm();

  // Fetch data
  useEffect(() => {
    fetchSchools();
    fetchAdmins();
  }, []);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const res = await API.get("/schools");
      setSchools(res.data.data);
    } catch {
      message.error("Failed to load schools");
    }
    setLoading(false);
  };

  const fetchAdmins = async () => {
    try {
      const res = await API.get("/school-admins");
      setAdmins(res.data.data);
    } catch {
      message.error("Failed to load admins");
    }
  };

  // Create school
  const handleCreateSchool = async (values) => {
    try {
      await API.post("/schools", values);
      message.success("✅ School created successfully");
      form.resetFields();
      setIsSchoolModal(false);
      fetchSchools();
    } catch {
      message.error("❌ Failed to create school");
    }
  };

  // Delete school
  const handleDeleteSchool = async (id) => {
    try {
      await API.delete(`/schools/${id}`);
      message.success("🗑️ School deleted");
      fetchSchools();
    } catch {
      message.error("❌ Failed to delete school");
    }
  };

  // Create admin
  const handleCreateAdmin = async (values) => {
    try {
      await API.post("/school-admins", values);
      message.success("✅ Admin created successfully");
      adminForm.resetFields();
      setIsAdminModal(false);
      fetchAdmins();
    } catch {
      message.error("❌ Failed to create admin");
    }
  };

  // Delete admin
  const handleDeleteAdmin = async (id) => {
    try {
      await API.delete(`/school-admins/${id}`);
      message.success("🗑️ Admin deleted");
      fetchAdmins();
    } catch {
      message.error("❌ Failed to delete admin");
    }
  };

  const schoolColumns = [
    { title: "School ID", dataIndex: "id" },
    { title: "School Name", dataIndex: "name" },
    {
      title: "Actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this school?"
          onConfirm={() => handleDeleteSchool(record.id)}
        >
          <Button danger size="small">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  const adminColumns = [
    { title: "Admin ID", dataIndex: "id" },
    { title: "Username", dataIndex: "username" },
    {
      title: "School",
      render: (_, record) => record.School?.name || "N/A",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this admin?"
          onConfirm={() => handleDeleteAdmin(record.id)}
        >
          <Button danger size="small">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Card
        title="🏫 Manage Schools"
        extra={<Button type="primary" onClick={() => setIsSchoolModal(true)}>+ Add School</Button>}
        style={{ marginBottom: 30 }}
      >
        {loading ? <Spin /> : <Table columns={schoolColumns} dataSource={schools} rowKey="id" />}
      </Card>

      <Card
        title="👨‍🏫 Manage School Admins"
        extra={<Button type="primary" onClick={() => setIsAdminModal(true)}>+ Add Admin</Button>}
      >
        <Table columns={adminColumns} dataSource={admins} rowKey="id" />
      </Card>

      {/* Create School Modal */}
      <Modal
        title="Add New School"
        open={isSchoolModal}
        onCancel={() => setIsSchoolModal(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateSchool}>
          <Form.Item label="School Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter school name" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create
          </Button>
        </Form>
      </Modal>

      {/* Create Admin Modal */}
      <Modal
        title="Add New School Admin"
        open={isAdminModal}
        onCancel={() => setIsAdminModal(false)}
        footer={null}
      >
        <Form form={adminForm} layout="vertical" onFinish={handleCreateAdmin}>
          <Form.Item label="Username" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="Select School" name="school_id" rules={[{ required: true }]}>
            <Select placeholder="Choose a school">
              {schools.map((s) => (
                <Select.Option key={s.id} value={s.id}>
                  {s.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Admin
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
