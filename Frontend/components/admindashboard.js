// import React, { useState } from 'react';
// import { Table, Input, Button, Space,message} from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
// import axios from 'axios';

// const { Column } = Table;

// const initialData = [
//   {
//     key: '1',
//     image: 'https://via.placeholder.com/50',
//     productname: 'Apple Watch Series 7',
//     category: 'Wearables',
//     price: 100,
//     stock: 250,
//     sold: 100,
//     revenue: 10000,
//   },
//   {
//     key: '2',
//     image: 'https://via.placeholder.com/50',
//     productname: 'Sony PlayStation 5',
//     category: 'Gaming',
//     price: 150,
//     stock: 200,
//     sold: 150,
//     revenue: 15000,
//   },
//   {
//     key: '3',
//     image: 'https://via.placeholder.com/50',
//     productname: 'Unique Wall Poster',
//     category: 'Home Decors',
//     price: 150,
//     stock: 200,
//     sold: 150,
//     revenue: 15000,
//   },
//   {
//     key: '4',
//     image: 'https://via.placeholder.com/50',
//     productname: 'MAC Matte Lipstick',
//     category: 'Cosmetics',
//     price: 150,
//     stock: 200,
//     sold: 150,
//     revenue: 15000,
//   },
//   {
//     key: '5',
//     image: 'https://via.placeholder.com/50',
//     productname: 'Floral Print Dress',
//     category: 'Dresses',
//     price: 150,
//     stock: 200,
//     sold: 150,
//     revenue: 15000,
//   },
//   {
//     key: '6',
//     image: 'https://via.placeholder.com/50',
//     productname: 'Classy Women Slingbags',
//     category: 'Handbags',
//     price: 150,
//     stock: 200,
//     sold: 150,
//     revenue: 15000,
//   },
//   {
//     key: '7',
//     image: 'https://via.placeholder.com/50',
//     productname: 'MAC Matte Lipstick',
//     category: 'Cosmetics',
//     price: 150,
//     stock: 200,
//     sold: 150,
//     revenue: 15000,
//   },
//   {
//     key: '8',
//     image: 'https://via.placeholder.com/50',
//     productname: 'Elite Jewellery Sets',
//     category: 'Jewellery',
//     price: 150,
//     stock: 200,
//     sold: 150,
//     revenue: 15000,
//   },
//   // Add more products as needed
// ];

// const AdminDashboard = () => {
//   const [data, setData] = useState(initialData);
//   const [editingKey, setEditingKey] = useState('');

//   const isEditing = (record) => record.key === editingKey;

//   const handleEdit = (key) => {
//     setEditingKey(key);
//   };
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/dashboard');
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       message.error('Failed to fetch products');
//     }
//   };
//   const handleSave = async (key) => {
//     const item = data.find((item) => item.key === key);
//     try {
//       await axios.put(`http://localhost:5000/dashboard/${key}`, item);
//       message.success('Product updated successfully');
//       setEditingKey('');
//       // fetchProducts();
//     } catch (error) {
//       console.error('Error updating product:', error);
//       message.error('Failed to update product');
//     }
//   };

//   const handleChange = (key, dataIndex, value) => {
//     const newData = [...data];
//     const index = newData.findIndex((item) => key === item.key);
//     if (index > -1) {
//       const item = newData[index];
//       newData.splice(index, 1, { ...item, [dataIndex]: value });
//       setData(newData);
//     }
//   };

//   const handleDelete = async (key) => {
//     try {
//       await axios.delete(`http://localhost:5000/dashboard/${key}`);
//       message.success('Product deleted successfully');
//       const newData = data.filter((item) => item.key !== key);
//       setData(newData);
//     } catch (error) {
//       console.error('Error deleting product:', error);
//       message.error('Failed to delete product');
//     }
//   };

//   const renderEditableCell = (text, record, dataIndex) => {
//     return isEditing(record) ? (
//       <Input
//         value={text}
//         onChange={(e) => handleChange(record.key, dataIndex, e.target.value)}
//       />
//     ) : (
//       text
//     );
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <div style={{ marginBottom: '16px' }}>
//         {/* <Input placeholder="Search" prefix={<SearchOutlined />} style={{ width: '200px', marginRight: '8px' }} /> */}
//         <Button type="primary" style={{ float: 'right' }}>Add Product</Button>
//       </div>
//       <Table dataSource={data} rowKey="key">
//         <Column title="Image" dataIndex="image" key="image" render={(image) => <img src={image} alt="product" style={{ width: '50px', height: 'auto' }} />} />
//         <Column title="Product Name" dataIndex="productname" key="productname" render={(text, record) => renderEditableCell(text, record, 'productName')} />
//         <Column title="Category" dataIndex="category" key="category" render={(text, record) => renderEditableCell(text, record, 'category')} />
//         <Column title="Price" dataIndex="price" key="price" render={(text, record) => renderEditableCell(text, record, 'price')} />
//         <Column title="Stock" dataIndex="stock" key="stock" render={(text, record) => renderEditableCell(text, record, 'stock')} />
//         <Column title="Sold" dataIndex="sold" key="sold" render={(text, record) => renderEditableCell(text, record, 'sold')} />
//         <Column title="Revenue" dataIndex="revenue" key="revenue" render={(text, record) => renderEditableCell(text, record, 'revenue')} />
//         <Column
//           title="Action"
//           key="action"
//           render={(text, record) => {
//             const editable = isEditing(record);
//             return (
//               <Space size="middle">
//                 {editable ? (
//                   <Button onClick={() => handleSave(record.key)}>Save</Button>
//                 ) : (
//                   <Button onClick={() => handleEdit(record.key)}>Edit</Button>
//                 )}
//                 <Button onClick={() => handleDelete(record.key)} danger>Delete</Button>
//               </Space>
//             );
//           }}
//         />
//       </Table>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState } from 'react';
import { Table, Input, Button, Space, message, Modal, Form, Upload } from 'antd';
import {  UploadOutlined } from '@ant-design/icons';
import axios from 'axios';


const { Column } = Table;

const initialData = [
  {
    key: '1',
    image: 'https://via.placeholder.com/50',
    productname: 'Apple Watch Series 7',
    category: 'Wearables',
    price: 1000,
    stock: 250,
    sold: 100,
    revenue: 10000,
  },
  {
    key: '2',
    image: 'https://via.placeholder.com/50',
    productname: 'Sony PlayStation 5',
    category: 'Gaming',
    price: 150,
    stock: 200,
    sold: 150,
    revenue: 15000,
  },
  {
    key: '3',
    image: 'https://via.placeholder.com/50',
    productname: 'Unique Wall Poster',
    category: 'Home Decors',
    price: 150,
    stock: 200,
    sold: 150,
    revenue: 15000,
  },
  {
    key: '4',
    image: 'https://via.placeholder.com/50',
    productname: 'MAC Matte Lipstick',
    category: 'Cosmetics',
    price: 150,
    stock: 200,
    sold: 150,
    revenue: 15000,
  },
  {
    key: '5',
    image: 'https://via.placeholder.com/50',
    productname: 'Floral Print Dress',
    category: 'Dresses',
    price: 150,
    stock: 200,
    sold: 150,
    revenue: 15000,
  },
  {
    key: '6',
    image: 'https://via.placeholder.com/50',
    productname: 'Classy Women Slingbags',
    category: 'Handbags',
    price: 120,
    stock: 300,
    sold: 180,
    revenue: 25000,
  },
  {
    key: '7',
    image: 'https://via.placeholder.com/50',
    productname: 'MAC Matte Lipstick',
    category: 'Cosmetics',
    price: 100,
    stock: 200,
    sold: 190,
    revenue: 10000,
  },
  {
    key: '8',
    image: 'https://via.placeholder.com/50',
    productname: 'Elite Jewellery Sets',
    category: 'Jewellery',
    price: 120,
    stock: 250,
    sold: 110,
    revenue: 19000,
  },
  // Add more products as needed
];

const AdminDashboard = () => {
  const [data, setData] = useState(initialData);
  const [editingKey, setEditingKey] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const isEditing = (record) => record.key === editingKey;

  const handleEdit = (key) => {
    setEditingKey(key);
  };

  const handleSave = async (key) => {
    const item = data.find((item) => item.key === key);
    try {
      await axios.put(`http://localhost:5000/dashboard/${key}`, item);
      message.success('Product updated successfully');
      setEditingKey('');
      // fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      message.error('Failed to update product');
    }
  };

  const handleChange = (key, dataIndex, value) => {
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, [dataIndex]: value });
      setData(newData);
    }
  };

  const handleDelete = async (key) => {
    try {
      await axios.delete(`http://localhost:5000/dashboard/${key}`);
      message.success('Product deleted successfully');
      const newData = data.filter((item) => item.key !== key);
      setData(newData);
    } catch (error) {
      console.error('Error deleting product:', error);
      message.error('Failed to delete product');
    }
  };

  const renderEditableCell = (text, record, dataIndex) => {
    return isEditing(record) ? (
      <Input
        value={text}
        onChange={(e) => handleChange(record.key, dataIndex, e.target.value)}
      />
    ) : (
      text
    );
  };

  const handleAddProduct = async (values) => {
    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      const response = await axios.post('http://localhost:5000/dashboard', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Product added successfully');
      setData([...data, response.data]);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error adding product:', error);
      message.error('Failed to add product');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Button type="primary" style={{ float: 'right' }} onClick={() => setIsModalVisible(true)}>
          Add Product
        </Button>
      </div>
      <Table dataSource={data} rowKey="key">
        <Column title="Image" dataIndex="image" key="image" render={(image) => <img src={image} alt="product" style={{ width: '50px', height: 'auto' }} />} />
        <Column title="Product Name" dataIndex="productname" key="productname" render={(text, record) => renderEditableCell(text, record, 'productName')} />
        <Column title="Category" dataIndex="category" key="category" render={(text, record) => renderEditableCell(text, record, 'category')} />
        <Column title="Price" dataIndex="price" key="price" render={(text, record) => renderEditableCell(text, record, 'price')} />
        <Column title="Stock" dataIndex="stock" key="stock" render={(text, record) => renderEditableCell(text, record, 'stock')} />
        <Column title="Sold" dataIndex="sold" key="sold" render={(text, record) => renderEditableCell(text, record, 'sold')} />
        <Column title="Revenue" dataIndex="revenue" key="revenue" render={(text, record) => renderEditableCell(text, record, 'revenue')} />
        <Column
          title="Action"
          key="action"
          render={(text, record) => {
            const editable = isEditing(record);
            return (
              <Space size="middle">
                {editable ? (
                  <Button onClick={() => handleSave(record.key)}>Save</Button>
                ) : (
                  <Button onClick={() => handleEdit(record.key)}>Edit</Button>
                )}
                <Button onClick={() => handleDelete(record.key)} danger>
                  Delete
                </Button>
              </Space>
            );
          }}
        />
      </Table>
      <Modal
        title="Add Product"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddProduct}>
          <Form.Item
            name="image"
            label="Image"
            valuePropName="file"
            getValueFromEvent={(e) => e.fileList[0]}
            rules={[{ required: true, message: 'Please upload an image' }]}
          >
            <Upload name="image" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="productname" label="Product Name" rules={[{ required: true, message: 'Please enter product name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please enter category' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter price' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true, message: 'Please enter stock' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="sold" label="Sold" rules={[{ required: true, message: 'Please enter sold' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="revenue" label="Revenue" rules={[{ required: true, message: 'Please enter revenue' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;