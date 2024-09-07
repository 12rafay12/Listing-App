import React from "react";
import { Layout, Badge, Avatar, Typography } from "antd";
import { BellOutlined } from "@ant-design/icons";
import "./TopNav.css";

const { Header } = Layout;
const { Text } = Typography;

const TopNav = ({ collapsed }) => {
  return (
    <Header className="top-nav" style={{ marginLeft: collapsed ? 0 : 200 }}>
      <div className="main-container">
        <div
          className="left-container"
          style={{ marginLeft: collapsed ? 100 : 10 }}
        >
          <Text className="left-container-text">Skills Assessment</Text>
        </div>
        <div className="right-container">
          <Badge dot>
            <BellOutlined className="notification-icon" />
          </Badge>
          <Avatar
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=3"
            className="right-avatar"
          />
          <div className=" right-container-typography">
            <Text strong>Abdur Rafay</Text>
            <Text type="secondary">Developer</Text>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default TopNav;
