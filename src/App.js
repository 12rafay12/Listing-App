import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./Pages/List/List";
import New from "./Pages/List/New";
import "./App.css";
import { Layout } from "antd";
import SideNav from "./Components/SideNav/SideNav";
import TopNav from "./Components/TopNav/TopNav";
const { Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isScreenWide, setIsScreenWide] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenWide(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <BrowserRouter>
      <Layout>
        <SideNav
          collapsed={collapsed}
          onCollapseToggle={handleCollapseToggle}
          setCollapsed={setCollapsed}
        />
        <Layout style={{ marginLeft: isScreenWide && !collapsed ? 200 : 0 }}>
          <TopNav collapsed={collapsed} />
          <Content className="content">
            <Routes>
              <Route path="/Listing-App" element={<List />} />
              <Route path="/Listing-App/form/:id?" element={<New />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
