import React, { useState, useEffect, useRef } from "react";
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
  const sideNavRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenWide(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        window.innerWidth <= 768 &&
        sideNavRef.current &&
        !sideNavRef.current.contains(event.target)
      ) {
        setCollapsed(true);
      }
    };
    if (window.innerWidth <= 768) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [collapsed]);

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <BrowserRouter>
      <Layout>
        <SideNav
          ref={sideNavRef}
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
