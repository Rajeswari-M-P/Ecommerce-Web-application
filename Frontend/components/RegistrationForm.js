// import React, { useState } from 'react';
// import { Form, Input, Button, message } from 'antd';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // For navigation

// const RegistrationForm = () => {
//   const [isRegister, setIsRegister] = useState(true);
//   const [role, setRole] = useState('user'); // Default role is 'user'
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });
//   const navigate = useNavigate(); // For navigation

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleToggle = () => {
//     setIsRegister(!isRegister);
//   };

//   const handleRoleToggle = (selectedRole) => {
//     setRole(selectedRole);
//   };

//   const handleSubmit = async (values) => {
//     const url = isRegister ? `http://localhost:5000/${role}/register` : `http://localhost:5000/${role}/login`;
//     const userData = isRegister ? values : { email: values.email, password: values.password };
  
//     try {
//       const response = await axios.post(url, userData);
//       if (response.status === 201 || response.status === 200) {
//         message.success(isRegister ? 'Registration successful' : 'Login successful');
//         if (role === 'admin') {
//           navigate('/dashboard'); // Redirect to admin page
//         } else {
//           navigate('/'); // Redirect to home page
//         }
//         setFormData({
//           username: '',
//           email: '',
//           password: ''
//         });
//       } else {
//         message.error(response.data.message || (isRegister ? 'Registration failed' : 'Login failed'));
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 409 && error.response.data.message === 'You are already registered') {
//         message.warning('You are already registered. Please login instead.');
//       } else {
//         const errorMessage = error.response?.data?.error || (isRegister ? 'Registration failed' : 'Login failed');
//         message.error(errorMessage);
//       }
//     }
//   };
  
//   return (
//     <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
//       <h2>{isRegister ? 'Register' : 'Login'}</h2>
//       <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
//         <Button
//           type={role === 'user' ? 'primary' : 'default'}
//           onClick={() => handleRoleToggle('user')}
//           style={{ marginRight: '10px' }}
//         >
//           User
//         </Button>
//         <Button
//           type={role === 'admin' ? 'primary' : 'default'}
//           onClick={() => handleRoleToggle('admin')}
//         >
//           Admin
//         </Button>
//       </div>
//       <Form layout="vertical" onFinish={handleSubmit}>
//         {isRegister && (
//           <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
//             <Input name="username" value={formData.username} onChange={handleChange} />
//           </Form.Item>
//         )}
//         <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
//           <Input type="email" name="email" value={formData.email} onChange={handleChange} />
//         </Form.Item>
//         <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
//           <Input.Password name="password" value={formData.password} onChange={handleChange} />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
//             {isRegister ? 'Register' : 'Login'}
//           </Button>
//         </Form.Item>
//       </Form>
//       <Button type="link" onClick={handleToggle} style={{ width: '100%', textAlign: 'center' }}>
//         {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
//       </Button>
//     </div>
//   );
// };

// export default RegistrationForm;


import React, { useState, useContext } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const RegistrationForm = () => {
  const { setUser } = useContext(UserContext);
  const [isRegister, setIsRegister] = useState(true);
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggle = () => {
    setIsRegister(!isRegister);
  };

  const handleRoleToggle = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = async (values) => {
    const url = isRegister ? `http://localhost:5000/${role}/register` : `http://localhost:5000/${role}/login`;
    const userData = isRegister ? values : { email: values.email, password: values.password };

    try {
      const response = await axios.post(url, userData);
      if (response.status === 201 || response.status === 200) {
        message.success(isRegister ? 'Registration successful' : 'Login successful');
        setUser(response.data.user); // Set the user context
        if (role === 'admin') {
          navigate('/dashboard'); // Redirect to admin page
        } else {
          navigate('/'); // Redirect to home page
        }
        setFormData({
          username: '',
          email: '',
          password: ''
        });
      } else {
        message.error(response.data.message || (isRegister ? 'Registration failed' : 'Login failed'));
      }
    } catch (error) {
      if (error.response && error.response.status === 409 && error.response.data.message === 'You are already registered') {
        message.warning('You are already registered. Please login instead.');
      } else {
        const errorMessage = error.response?.data?.error || (isRegister ? 'Registration failed' : 'Login failed');
        message.error(errorMessage);
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <Button
          type={role === 'user' ? 'primary' : 'default'}
          onClick={() => handleRoleToggle('user')}
          style={{ marginRight: '10px' }}
        >
          User
        </Button>
        <Button
          type={role === 'admin' ? 'primary' : 'default'}
          onClick={() => handleRoleToggle('admin')}
        >
          Admin
        </Button>
      </div>
      <Form layout="vertical" onFinish={handleSubmit}>
        {isRegister && (
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input name="username" value={formData.username} onChange={handleChange} />
          </Form.Item>
        )}
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password name="password" value={formData.password} onChange={handleChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={handleToggle} style={{ width: '100%', textAlign: 'center' }}>
        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
      </Button>
    </div>
  );
};

export default RegistrationForm;
