import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, HomeOutlined, TableOutlined } from "@ant-design/icons";
import Dashboard from "./pages";
import { Switch, Route, Link } from "react-router-dom";
import User from "./pages/User";
import Nilai from "./pages/Nilai";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            height: "32px",
            margin: "16px",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/user">User</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<TableOutlined />}>
            <Link to="/nilai">Nilai</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Content style={{ margin: "24px 16px 0" }}>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/user">
              <User />
            </Route>
            <Route path="/dashboard">
              <Nilai />
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>AR Dashboard ©2021</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
