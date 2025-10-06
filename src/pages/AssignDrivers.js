// // import React, { useEffect, useState } from "react";
// // import { Table, Card, Select, message, Spin } from "antd";
// // import API from "../api/axios";

// // export default function AssignDrivers() {
// //   const [drivers, setDrivers] = useState([]);
// //   const [schools, setSchools] = useState([]);
// //   const [loading, setLoading] = useState(false);

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
// //       const res = await API.get("/schools"); // backend must expose this
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
// //       fetchUnassignedDrivers(); // refresh list
// //     } catch (err) {
// //       console.error(err);
// //       message.error("❌ Error assigning driver");
// //     }
// //     setLoading(false);
// //   };

// //   const columns = [
// //   { title: "Driver Name", dataIndex: "name", key: "name" },
// //   { title: "Device ID", dataIndex: "device_id", key: "device_id" },
// //   { title: "School ID", dataIndex: "school_id", key: "school_id" }, // ✅ Show current school_id
// //   {
// //     title: "Assign to School",
// //     render: (_, record) => (
// //       <Select
// //         placeholder="Select School"
// //         style={{ width: 200 }}
// //         onChange={(schoolId) => handleAssign(record.id, schoolId)}
// //       >
// //         {schools.map((s) => (
// //           <Select.Option key={s.id} value={s.id}>
// //             {s.name} (ID: {s.id})
// //           </Select.Option>
// //         ))}
// //       </Select>

// //       ),
// //     },
// //   ];

// //   return (
// //     <Card title="Unassigned Drivers">
// //       {loading ? (
// //         <Spin />
// //       ) : (
// //         <Table dataSource={drivers} columns={columns} rowKey="id" />
// //       )}
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

//   // Fetch unassigned drivers & schools
//   useEffect(() => {
//     fetchUnassignedDrivers();
//     fetchSchools();
//   }, []);

//   const fetchUnassignedDrivers = async () => {
//     try {
//       const res = await API.get("/drivers/unassigned");
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
//       fetchUnassignedDrivers();
//     } catch (err) {
//       console.error(err);
//       message.error("❌ Error assigning driver");
//     }
//     setLoading(false);
//   };

//   // ✅ Create driver API call
//   const handleCreateDriver = async (values) => {
//     try {
//       await API.post("/drivers/register", values);
//       message.success("✅ Driver created successfully");
//       setIsModalOpen(false);
//       form.resetFields();
//       fetchUnassignedDrivers(); // refresh list
//     } catch (err) {
//       console.error(err);
//       message.error("❌ Error creating driver");
//     }
//   };

//   const columns = [
//     { title: "Driver Name", dataIndex: "name", key: "name" },
//     { title: "Device ID", dataIndex: "device_id", key: "device_id" },
//     { title: "School ID", dataIndex: "school_id", key: "school_id" },
//     {
//       title: "Assign to School",
//       render: (_, record) => (
//         <Select
//           placeholder="Select School"
//           style={{ width: 200 }}
//           onChange={(schoolId) => handleAssign(record.id, schoolId)}
//         >
//           {schools.map((s) => (
//             <Select.Option key={s.id} value={s.id}>
//               {s.name} (ID: {s.id})
//             </Select.Option>
//           ))}
//         </Select>
//       ),
//     },
//   ];

//   return (
//     <Card
//       title="Unassigned Drivers"
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
//           <Form.Item label="Driver Username/ID" name="username" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item label="Password" name="password" rules={[{ required: true }]}>
//             <Input.Password />
//           </Form.Item>
//           <Form.Item label="School" name="school_id" rules={[{ required: true }]}>
//             <Select placeholder="Select School">
//               {schools.map((s) => (
//                 <Select.Option key={s.id} value={s.id}>
//                   {s.name} (ID: {s.id})
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
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

import React, { useEffect, useState } from "react";
import { Table, Card, Select, message, Spin, Button, Modal, Form, Input } from "antd";
import API from "../api/axios";

export default function AssignDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // 🧠 Get logged-in user role & school_id from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const isSuperAdmin = user?.role === "superadmin";
  const isSchoolAdmin = user?.role === "schooladmin";

  // ✅ Fetch all drivers (filtered automatically in backend)
  useEffect(() => {
    fetchDrivers();
    if (isSuperAdmin) fetchSchools(); // only superadmin can fetch school list
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await API.get("/drivers");
      setDrivers(res.data.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load drivers");
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

  const handleAssign = async (driverId, schoolId) => {
    setLoading(true);
    try {
      await API.put(`/drivers/${driverId}/assign`, { school_id: schoolId });
      message.success("✅ Driver assigned successfully");
      fetchDrivers();
    } catch (err) {
      console.error(err);
      message.error("❌ Error assigning driver");
    }
    setLoading(false);
  };

  // ✅ Create driver API call
  const handleCreateDriver = async (values) => {
    try {
      // If school admin, force attach their own school_id
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

  const columns = [
    { title: "Driver Name", dataIndex: "name", key: "name" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Device ID", dataIndex: "device_id", key: "device_id" },
    {
      title: "School",
      render: (_, record) => record.School ? record.School.name : "Unassigned",
    },
    ...(isSuperAdmin
      ? [
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
        ]
      : []),
  ];

  return (
    <Card
      title={isSuperAdmin ? "Manage Drivers (All Schools)" : "My School Drivers"}
      extra={
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          + Create Driver
        </Button>
      }
    >
      {loading ? (
        <Spin />
      ) : (
        <Table dataSource={drivers} columns={columns} rowKey="id" />
      )}

      {/* ✅ Create Driver Modal */}
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
          <Form.Item label="Driver Username" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          {/* 🔹 Only show School dropdown for Superadmin */}
          {isSuperAdmin && (
            <Form.Item label="School" name="school_id" rules={[{ required: true }]}>
              <Select placeholder="Select School">
                {schools.map((s) => (
                  <Select.Option key={s.id} value={s.id}>
                    {s.name} (ID: {s.id})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {/* 🔹 School Admin sees prefilled info */}
          {isSchoolAdmin && (
            <Form.Item label="School" initialValue={user?.school_id}>
              <Input value={user?.school_id} disabled />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
