"use client";

import React, { useState } from 'react'
import {
  Button,
  Layout,
  Menu,
  theme,
} from "antd"
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { useRouter } from 'next/navigation';

const {
  Sider,
  Content,
  Header,
} = Layout;

function AdminContainer({ children }: any) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const nav = useRouter();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='demo-logo-vertical' style={{ textAlign: "center", height: 48, backgroundColor: "lightcyan" }}>Websit-Icon</div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          onClick={(e) =>{
            nav.push(e.key);
          }}
          items={[
            {
              key: '/admin/dashboard',
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: '/admin/user',
              icon: <UserOutlined />,
              label: "User",
            },
            {
              key: '/admin/articles',
              icon: <UploadOutlined />,
              label: "Article",
            },
          ]}>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          ></Button>
        </Header>
        <Content style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
        }}>
            {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminContainer