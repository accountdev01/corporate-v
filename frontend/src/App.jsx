import React, { useState } from 'react';
import { Layout, Menu, theme, Typography, Avatar } from 'antd';
import { CarOutlined, DashboardOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import VehicleDashboard from './features/vehicle-management/components/VehicleDashboard';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light" width={250} style={{ boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)', zIndex: 10 }}>
        <div style={{ height: 64, margin: 16, display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '8px' }}>
          <div style={{ width: 36, height: 36, borderRadius: '8px', background: '#1677ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CarOutlined style={{ color: '#fff', fontSize: '20px' }} />
          </div>
          {!collapsed && (
            <Title level={5} style={{ margin: 0, fontWeight: 700, background: 'linear-gradient(45deg, #1677ff, #00c6ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Corporat-Veh
            </Title>
          )}
        </div>
        <Menu 
          theme="light" 
          defaultSelectedKeys={['vehicles']} 
          mode="inline" 
          items={[
            { key: 'vehicles', icon: <CarOutlined />, label: 'จัดการรถยนต์ของบริษัท' },
          ]} 
          style={{ borderRight: 0 }}
        />
      </Sider>

      <Layout>
        <Content style={{ marginLeft: '5px'}}>
          <div style={{ padding: 24, minHeight: '100vh', background: colorBgContainer, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}>
            <VehicleDashboard />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;