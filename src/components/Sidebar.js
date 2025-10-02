import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, DashboardOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;

export default function AppLayout({ children }) {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "assignDrivers",
      icon: <UserOutlined />,
      label: "Assign Drivers",
      onClick: () => navigate("/assign-drivers"),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="dark" collapsible>
        <div
          style={{
            color: "white",
            textAlign: "center",
            padding: "16px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          SmartBus360
        </div>
        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>
      <Layout>
        <Content style={{ margin: "16px", padding: "16px", background: "white" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
