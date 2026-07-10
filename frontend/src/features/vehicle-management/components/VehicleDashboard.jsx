import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Popconfirm, Tag, Row, Col, Typography, Input as AntdInput } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { vehicleApi } from '../services/vehicleApi';

const { Title, Text } = Typography;

const VehicleDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const fetchVehicles = async (search = '') => {
    setLoading(true);
    try {
      const res = await vehicleApi.getAll(search);
      if (res.status === 'success') setVehicles(res.data);
    } catch (err) {
      message.error('ไม่สามารถโหลดข้อมูลได้');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVehicles(); }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    fetchVehicles(value);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (editingVehicle) {
        await vehicleApi.update(editingVehicle._id, values);
        message.success('แก้ไขข้อมูลสำเร็จ');
      } else {
        await vehicleApi.create(values);
        message.success('เพิ่มข้อมูลสำเร็จ');
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingVehicle(null);
      fetchVehicles(searchText);
    } catch (err) {
      message.error(err.response?.data?.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  };

  const handleDelete = async (id) => {
    try {
      await vehicleApi.delete(id);
      message.success('ลบข้อมูลเรียบร้อยแล้ว');
      fetchVehicles(searchText);
    } catch (err) {
      message.error('ไม่สามารถลบข้อมูลได้');
    }
  };

  const openEditModal = (record) => {
    setEditingVehicle(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: 'ทะเบียนรถ',
      dataIndex: 'number',
      key: 'number',
      render: (text) => <Text strong style={{ color: '#1890ff' }}>{text}</Text>,
    },
    {
      title: 'ยี่ห้อ',
      dataIndex: 'brand',
      key: 'brand',
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: 'รุ่น',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'หมายเหตุ',
      dataIndex: 'notes',
      key: 'notes',
      ellipsis: true,
      render: (text) => text || <Text type="secondary">-</Text>
    },
    {
      title: 'ข้อมูลอื่นๆ',
      dataIndex: 'etc',
      key: 'etc',
      ellipsis: true,
      render: (text) => text || <Text type="secondary">-</Text>
    },
    {
      title: 'การจัดการ',
      key: 'action',
      width: 200,
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          <Button type="text" icon={<EditOutlined style={{ color: '#faad14' }} />} onClick={() => openEditModal(record)}>
            แก้ไข
          </Button>
          <Popconfirm title="คุณแน่ใจที่จะลบหรือไม่ ?" onConfirm={() => handleDelete(record._id)} okText="ลบ" cancelText="ยกเลิก" okButtonProps={{ danger: true }}>
            <Button type="text" danger icon={<DeleteOutlined />}>
              ลบ
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <Title level={4} style={{ margin: 0, fontWeight: 600 }}>รายชื่อยานพาหนะทั้งหมด</Title>
          <Text type="secondary">จัดการ ค้นหา และอัปเดตข้อมูลรถยนต์ภายในบริษัทของคุณ</Text>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <AntdInput.Search
            placeholder="ค้นหา ทะเบียน, ยี่ห้อ, รุ่น..."
            allowClear
            enterButton={<SearchOutlined />}
            onSearch={handleSearch}
            style={{ width: 280 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingVehicle(null); form.resetFields(); setIsModalOpen(true); }} style={{ borderRadius: '6px', fontWeight: 500 }}>
            เพิ่มรถยนต์ใหม่
          </Button>
        </div>
      </div>

      <Table 
        columns={columns} 
        dataSource={vehicles} 
        rowKey="_id" 
        loading={loading}
        pagination={{ pageSize: 10, showTotal: (total) => `รวมทั้งหมด ${total} คัน` }}
        bordered={false}
        style={{ background: '#fff' }}
      />

      <Modal 
        title={<Title level={4} style={{ margin: 0 }}>{editingVehicle ? "📝 แก้ไขข้อมูลรถยนต์" : "➕ เพิ่มรถยนต์คันใหม่"}</Title>} 
        open={isModalOpen} 
        onOk={form.submit} 
        onCancel={() => setIsModalOpen(false)} 
        destroyOnClose
        width={650}
        okText="บันทึกข้อมูล"
        cancelText="ยกเลิก"
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} style={{ marginTop: 20 }}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="number" label="ทะเบียนรถ" rules={[{ required: true, message: 'กรุณากรอกทะเบียนรถ' }]}>
                <Input placeholder="เช่น กข-1234" size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="brand" label="ยี่ห้อ" rules={[{ required: true, message: 'กรุณากรอกยี่ห้อ' }]}>
                <Input placeholder="เช่น Toyota, Honda" size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="model" label="รุ่น" rules={[{ required: true, message: 'กรุณากรอกรุ่น' }]}>
                <Input placeholder="เช่น Camry, Civic" size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="notes" label="หมายเหตุ / วัตถุประสงค์การใช้งาน">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="etc" label="ข้อมูลอื่นๆ เพิ่มเติม">
            <Input.TextArea rows={2}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VehicleDashboard;