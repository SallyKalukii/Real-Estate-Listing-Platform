import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/authService';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      console.log('Login successful:', response);
      // Redirect or update auth context
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div>
      <AuthForm
        onSubmit={handleLogin}
        formType="login"
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default LoginPage;
