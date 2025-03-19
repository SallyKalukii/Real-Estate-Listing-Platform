import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { registerUser } from '../services/authService';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      console.log('Registration successful:', response);
      // Redirect or notify user
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div>
      <AuthForm
        onSubmit={handleRegister}
        formType="register"
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default RegisterPage;
