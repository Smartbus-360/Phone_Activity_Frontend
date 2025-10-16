// // // import React, { useEffect, useState } from "react";
// // // import { Table, Card, Select, message, Spin } from "antd";
// // // import API from "../api/axios";

// // // export default function AssignDrivers() {
// // //   const [drivers, setDrivers] = useState([]);
// // //   const [schools, setSchools] = useState([]);
// // //   const [loading, setLoading] = useState(false);

// // //   // Fetch unassigned drivers & schools
// // //   useEffect(() => {
// // //     fetchUnassignedDrivers();
// // //     fetchSchools();
// // //   }, []);

// // //   const fetchUnassignedDrivers = async () => {
// // //     try {
// // //       const res = await API.get("/drivers/unassigned");
// // //       setDrivers(res.data.data);
// // //     } catch (err) {
// // //       console.error(err);
// // //       message.error("Failed to load drivers");
// // //     }
// // //   };

// // //   const fetchSchools = async () => {
// // //     try {
// // //       const res = await API.get("/schools"); // backend must expose this
// // //       setSchools(res.data.data);
// // //     } catch (err) {
// // //       console.error(err);
// // //       message.error("Failed to load schools");
// // //     }
// // //   };

// // //   const handleAssign = async (driverId, schoolId) => {
// // //     setLoading(true);
// // //     try {
// // //       await API.put(`/drivers/${driverId}/assign`, { school_id: schoolId });
// // //       message.success("✅ Driver assigned successfully");
// // //       fetchUnassignedDrivers(); // refresh list
// // //     } catch (err) {
// // //       console.error(err);
// // //       message.error("❌ Error assigning driver");
// // //     }
// // //     setLoading(false);
// // //   };

// // //   const columns = [
// // //   { title: "Driver Name", dataIndex: "name", key: "name" },
// // //   { title: "Device ID", dataIndex: "device_id", key: "device_id" },
// // //   { title: "School ID", dataIndex: "school_id", key: "school_id" }, // ✅ Show current school_id
// // //   {
// // //     title: "Assign to School",
// // //     render: (_, record) => (
// // //       <Select
// // //         placeholder="Select School"
// // //         style={{ width: 200 }}
// // //         onChange={(schoolId) => handleAssign(record.id, schoolId)}
// // //       >
// // //         {schools.map((s) => (
// // //           <Select.Option key={s.id} value={s.id}>
// // //             {s.name} (ID: {s.id})
// // //           </Select.Option>
// // //         ))}
// // //       </Select>

// // //       ),
// // //     },
// // //   ];

// // //   return (
// // //     <Card title="Unassigned Drivers">
// // //       {loading ? (
// // //         <Spin />
// // //       ) : (
// // //         <Table dataSource={drivers} columns={columns} rowKey="id" />
// // //       )}
// // //     </Card>
// // //   );
// // // }


// // import React, { useEffect, useState } from "react";
// // import { Table, Card, Select, message, Spin, Button, Modal, Form, Input } from "antd";
// // import API from "../api/axios";

// // export default function AssignDrivers() {
// //   const [drivers, setDrivers] = useState([]);
// //   const [schools, setSchools] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [form] = Form.useForm();

// //   // Fetch unassigned drivers & schools
// //   useEffect(() => {
// //     fetchUnassignedDrivers();
// //     fetchSchools();
// //   }, []);

// //   const fetchUnassignedDrivers = async () => {
// //     try {
// //       const res = await API.get("/drivers/unassigned");
// //       setDrivers(res.data.data);
// //     } catch (err) {
// //       console.error(err);
// //       message.error("Failed to load drivers");
// //     }
// //   };

// //   const fetchSchools = async () => {
// //     try {
// //       const res = await API.get("/schools");
// //       setSchools(res.data.data);
// //     } catch (err) {
// //       console.error(err);
// //       message.error("Failed to load schools");
// //     }
// //   };

// //   const handleAssign = async (driverId, schoolId) => {
// //     setLoading(true);
// //     try {
// //       await API.put(`/drivers/${driverId}/assign`, { school_id: schoolId });
// //       message.success("✅ Driver assigned successfully");
// //       fetchUnassignedDrivers();
// //     } catch (err) {
// //       console.error(err);
// //       message.error("❌ Error assigning driver");
// //     }
// //     setLoading(false);
// //   };

// //   // ✅ Create driver API call
// //   const handleCreateDriver = async (values) => {
// //     try {
// //       await API.post("/drivers/register", values);
// //       message.success("✅ Driver created successfully");
// //       setIsModalOpen(false);
// //       form.resetFields();
// //       fetchUnassignedDrivers(); // refresh list
// //     } catch (err) {
// //       console.error(err);
// //       message.error("❌ Error creating driver");
// //     }
// //   };

// //   const columns = [
// //     { title: "Driver Name", dataIndex: "name", key: "name" },
// //     { title: "Device ID", dataIndex: "device_id", key: "device_id" },
// //     { title: "School ID", dataIndex: "school_id", key: "school_id" },
// //     {
// //       title: "Assign to School",
// //       render: (_, record) => (
// //         <Select
// //           placeholder="Select School"
// //           style={{ width: 200 }}
// //           onChange={(schoolId) => handleAssign(record.id, schoolId)}
// //         >
// //           {schools.map((s) => (
// //             <Select.Option key={s.id} value={s.id}>
// //               {s.name} (ID: {s.id})
// //             </Select.Option>
// //           ))}
// //         </Select>
// //       ),
// //     },
// //   ];

// //   return (
// //     <Card
// //       title="Unassigned Drivers"
// //       extra={
// //         <Button type="primary" onClick={() => setIsModalOpen(true)}>
// //           + Create Driver
// //         </Button>
// //       }
// //     >
// //       {loading ? (
// //         <Spin />
// //       ) : (
// //         <Table dataSource={drivers} columns={columns} rowKey="id" />
// //       )}

// //       {/* ✅ Create Driver Modal */}
// //       <Modal
// //         title="Create Driver"
// //         open={isModalOpen}
// //         onCancel={() => setIsModalOpen(false)}
// //         footer={null}
// //       >
// //         <Form form={form} layout="vertical" onFinish={handleCreateDriver}>
// //           <Form.Item label="Driver Name" name="name" rules={[{ required: true }]}>
// //             <Input />
// //           </Form.Item>
// //           <Form.Item label="Driver Username/ID" name="username" rules={[{ required: true }]}>
// //             <Input />
// //           </Form.Item>
// //           <Form.Item label="Password" name="password" rules={[{ required: true }]}>
// //             <Input.Password />
// //           </Form.Item>
// //           <Form.Item label="School" name="school_id" rules={[{ required: true }]}>
// //             <Select placeholder="Select School">
// //               {schools.map((s) => (
// //                 <Select.Option key={s.id} value={s.id}>
// //                   {s.name} (ID: {s.id})
// //                 </Select.Option>
// //               ))}
// //             </Select>
// //           </Form.Item>
// //           <Form.Item>
// //             <Button type="primary" htmlType="submit" block>
// //               Create
// //             </Button>
// //           </Form.Item>
// //         </Form>
// //       </Modal>
// //     </Card>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import { Table, Card, Select, message, Spin, Button, Modal, Form, Input } from "antd";
// import API from "../api/axios";

// export default function AssignDrivers() {
//   const [drivers, setDrivers] = useState([]);
//   const [schools, setSchools] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [form] = Form.useForm();

//   // 🧠 Get logged-in user role & school_id from localStorage
//   const user = JSON.parse(localStorage.getItem("user"));
//   const isSuperAdmin = user?.role === "superadmin";
//   const isSchoolAdmin = user?.role === "schooladmin";

//   // ✅ Fetch all drivers (filtered automatically in backend)
//   useEffect(() => {
//     fetchDrivers();
//     if (isSuperAdmin) fetchSchools(); // only superadmin can fetch school list
//   }, []);

//   const fetchDrivers = async () => {
//     try {
//       const res = await API.get("/drivers");
//       setDrivers(res.data.data);
//     } catch (err) {
//       console.error(err);
//       message.error("Failed to load drivers");
//     }
//   };

//   const fetchSchools = async () => {
//     try {
//       const res = await API.get("/schools");
//       setSchools(res.data.data);
//     } catch (err) {
//       console.error(err);
//       message.error("Failed to load schools");
//     }
//   };

//   const handleAssign = async (driverId, schoolId) => {
//     setLoading(true);
//     try {
//       await API.put(`/drivers/${driverId}/assign`, { school_id: schoolId });
//       message.success("✅ Driver assigned successfully");
//       fetchDrivers();
//     } catch (err) {
//       console.error(err);
//       message.error("❌ Error assigning driver");
//     }
//     setLoading(false);
//   };

//   // ✅ Create driver API call
//   const handleCreateDriver = async (values) => {
//     try {
//       // If school admin, force attach their own school_id
//       const payload = {
//         ...values,
//         school_id: isSchoolAdmin ? user.school_id : values.school_id,
//       };

//       await API.post("/drivers/register", payload);
//       message.success("✅ Driver created successfully");
//       setIsModalOpen(false);
//       form.resetFields();
//       fetchDrivers();
//     } catch (err) {
//       console.error(err);
//       message.error("❌ Error creating driver");
//     }
//   };

//   const columns = [
//     { title: "Driver Name", dataIndex: "name", key: "name" },
//     { title: "Username", dataIndex: "username", key: "username" },
//     { title: "Device ID", dataIndex: "device_id", key: "device_id" },
//     {
//       title: "School",
//       render: (_, record) => record.School ? record.School.name : "Unassigned",
//     },
//     ...(isSuperAdmin
//       ? [
//           {
//             title: "Assign to School",
//             render: (_, record) => (
//               <Select
//                 placeholder="Select School"
//                 style={{ width: 200 }}
//                 onChange={(schoolId) => handleAssign(record.id, schoolId)}
//               >
//                 {schools.map((s) => (
//                   <Select.Option key={s.id} value={s.id}>
//                     {s.name} (ID: {s.id})
//                   </Select.Option>
//                 ))}
//               </Select>
//             ),
//           },
//         ]
//       : []),
//   ];

//   return (
//     <Card
//       title={isSuperAdmin ? "Manage Drivers (All Schools)" : "My School Drivers"}
//       extra={
//         <Button type="primary" onClick={() => setIsModalOpen(true)}>
//           + Create Driver
//         </Button>
//       }
//     >
//       {loading ? (
//         <Spin />
//       ) : (
//         <Table dataSource={drivers} columns={columns} rowKey="id" />
//       )}

//       {/* ✅ Create Driver Modal */}
//       <Modal
//         title="Create Driver"
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={null}
//       >
//         <Form form={form} layout="vertical" onFinish={handleCreateDriver}>
//           <Form.Item label="Driver Name" name="name" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item label="Driver Username" name="username" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item label="Password" name="password" rules={[{ required: true }]}>
//             <Input.Password />
//           </Form.Item>

//           {/* 🔹 Only show School dropdown for Superadmin */}
//           {isSuperAdmin && (
//             <Form.Item label="School" name="school_id" rules={[{ required: true }]}>
//               <Select placeholder="Select School">
//                 {schools.map((s) => (
//                   <Select.Option key={s.id} value={s.id}>
//                     {s.name} (ID: {s.id})
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           )}

//           {/* 🔹 School Admin sees prefilled info */}
//           {isSchoolAdmin && (
//             <Form.Item label="School" initialValue={user?.school_id}>
//               <Input value={user?.school_id} disabled />
//             </Form.Item>
//           )}

//           <Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               Create
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </Card>
//   );
// }

// src/pages/AssignDrivers.js
import React, { useEffect, useState } from "react";
import {
  Table, Card, Select, message, Spin, Button, Modal, Form, Input,
  Space, Tag, Row, Col
} from "antd";
import {
  SearchOutlined, ReloadOutlined, DownloadOutlined
} from "@ant-design/icons";
import API from "../api/axios";

export default function AssignDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [editModalOpen, setEditModalOpen] = useState(false);
const [editingDriver, setEditingDriver] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();
const [editForm] = Form.useForm();


  const user = JSON.parse(localStorage.getItem("user"));
  const isSuperAdmin = user?.role === "superadmin";
  const isSchoolAdmin = user?.role === "schooladmin";

  // ✅ Initial fetch
  useEffect(() => {
    fetchDrivers();
    if (isSuperAdmin) fetchSchools();
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/drivers");
      setDrivers(res.data.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load drivers");
    } finally {
      setLoading(false);
    }
  };

  const fetchSchools = async () => {
    try {
      const res = await API.get("/schools");
      setSchools(res.data.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load schools");
    }
  };

  // 🔄 Assign driver to a school
  const handleAssign = async (driverId, schoolId) => {
    setLoading(true);
    try {
      await API.put(`/drivers/${driverId}/assign`, { school_id: schoolId });
      message.success("✅ Driver assigned successfully");
      fetchDrivers();
    } catch (err) {
      console.error(err);
      message.error("❌ Error assigning driver");
    } finally {
      setLoading(false);
    }
  };

  // ➕ Create new driver
  const handleCreateDriver = async (values) => {
    try {
      const payload = {
        ...values,
        school_id: isSchoolAdmin ? user.school_id : values.school_id,
      };
      await API.post("/drivers/register", payload);
      message.success("✅ Driver created successfully");
      setIsModalOpen(false);
      form.resetFields();
      fetchDrivers();
    } catch (err) {
      console.error(err);
      message.error("❌ Error creating driver");
    }
  };

  // ✏️ Handle edit click
const handleEdit = (driver) => {
  setEditingDriver(driver);
  form.setFieldsValue({
    name: driver.name,
    username: driver.username,
  });
  setEditModalOpen(true);
};

// ✅ Update driver API call
const handleUpdateDriver = async (values) => {
  try {
    await API.put(`/drivers/${editingDriver.id}`, values);
    message.success("✅ Driver updated successfully");
    setEditModalOpen(false);
    fetchDrivers();
  } catch (err) {
    console.error(err);
    message.error("❌ Error updating driver");
  }
};

const handleDelete = async (id) => {
  Modal.confirm({
    title: "Confirm Delete",
    content: "Are you sure you want to delete this driver?",
    okText: "Yes, Delete",
    cancelText: "Cancel",
    okType: "danger",
    async onOk() {
      try {
        await API.delete(`/drivers/${id}`);
        message.success("✅ Driver deleted successfully");
        fetchDrivers();
      } catch (err) {
        console.error(err);
        message.error("❌ Error deleting driver");
      }
    },
  });
};


  // 🔍 Search filter
  const filteredDrivers = drivers.filter((d) => {
    const text = searchText.toLowerCase();
    return (
      d.name?.toLowerCase().includes(text) ||
      d.username?.toLowerCase().includes(text) ||
      d.School?.name?.toLowerCase().includes(text)
    );
  });

  // 🧾 Export to CSV (Superadmin only)
  const exportCSV = () => {
    const rows = [
      ["Driver ID", "Name", "Username", "School", "Device ID"],
      ...drivers.map((d) => [
        d.id,
        d.name,
        d.username,
        d.School?.name || "Unassigned",
        d.device_id || "-",
      ]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((r) => r.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "drivers_list.csv";
    link.click();
  };

  // 🧱 Table Columns
  const columns = [
    { title: "ID", dataIndex: "id", width: 70 },
    { title: "Name", dataIndex: "name" },
    { title: "Username", dataIndex: "username" },
    {
      title: "School",
      render: (_, record) =>
        record.School ? (
          <Tag color="blue">{record.School.name}</Tag>
        ) : (
          <Tag color="red">Unassigned</Tag>
        ),
    },
    { title: "Device ID", dataIndex: "device_id" },
    ...(isSuperAdmin
      ? [
          {
            title: "Assign School",
            render: (_, record) => (
              <Select
                placeholder="Select School"
                style={{ width: 200 }}
                onChange={(schoolId) => handleAssign(record.id, schoolId)}
              >
                {schools.map((s) => (
                  <Select.Option key={s.id} value={s.id}>
                    {s.name}
                  </Select.Option>
                ))}
              </Select>
            ),
          },
        ]
      : []),
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },

  ];

  // 🧩 UI Layout
  return (
    <Card
      title={isSuperAdmin ? "Manage All Drivers" : "My School Drivers"}
      extra={
        <Space>
          <Input
            placeholder="Search driver or school"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 220 }}
          />
          <Button icon={<ReloadOutlined />} onClick={fetchDrivers}>
            Refresh
          </Button>
          {isSuperAdmin && (
            <Button icon={<DownloadOutlined />} onClick={exportCSV}>
              Export CSV
            </Button>
          )}
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            + Create Driver
          </Button>
        </Space>
      }
    >
      {loading ? (
        <Spin />
      ) : (
        <Table
          dataSource={filteredDrivers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 8 }}
        />
      )}

      {/* ➕ Create Driver Modal */}
      <Modal
        title="Create Driver"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateDriver}>
          <Form.Item label="Driver Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Username" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          {/* Only superadmin selects school */}
          {isSuperAdmin && (
            <Form.Item label="School" name="school_id" rules={[{ required: true }]}>
              <Select placeholder="Select School">
                {schools.map((s) => (
                  <Select.Option key={s.id} value={s.id}>
                    {s.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {/* School Admin — prefilled */}
          {isSchoolAdmin && (
            <Form.Item label="School">
              <Input value={user?.school_id} disabled />
            </Form.Item>
          )}

          <Button type="primary" htmlType="submit" block>
            Create Driver
          </Button>
        </Form>
      </Modal>
            {/* ✏️ Edit Driver Modal */}
<Modal
  title="Edit Driver"
  open={editModalOpen}
  onCancel={() => setEditModalOpen(false)}
  footer={null}
>
  <Form form={form} layout="vertical" onFinish={handleUpdateDriver}>
    <Form.Item label="Driver Name" name="name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Username" name="username" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item label="New Password (optional)" name="password">
      <Input.Password />
    </Form.Item>
    <Button type="primary" htmlType="submit" block>
      Save Changes
    </Button>
  </Form>
</Modal>

    </Card>
  );
}

