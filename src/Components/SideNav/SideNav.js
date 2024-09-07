import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FileAddOutlined,
  AppstoreOutlined,
  MenuOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import "./SideNav.css";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideNav = React.forwardRef(
  ({ collapsed, onCollapseToggle, setCollapsed }, ref) => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
      <>
        <Sider
          ref={ref}
          trigger={null}
          className={`side-nav ${collapsed ? "collapsed" : ""}`}
          breakpoint="sm"
          collapsed={collapsed}
          onBreakpoint={(broken) => {
            if (broken) {
              setCollapsed(true);
            }
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu mode="inline" theme="dark" selectedKeys={[currentPath]}>
            <Menu.Item key="/Listing-App" icon={<AppstoreOutlined />}>
              <Link to="/Listing-App">Listing</Link>
            </Menu.Item>
            <Menu.Item key="/Listing-App/form" icon={<FileAddOutlined />}>
              <Link to="/Listing-App/form">Create New</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<SettingOutlined />} title="Settings">
              <Menu.Item key="setting:1">Setting 1</Menu.Item>
              <Menu.Item key="setting:2">Setting 2</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>

        <Button
          className="hamburger-button"
          style={!collapsed ? { color: "white" } : null}
          type="text"
          icon={<MenuOutlined />}
          onClick={onCollapseToggle}
        />
      </>
    );
  }
);

export default SideNav;
