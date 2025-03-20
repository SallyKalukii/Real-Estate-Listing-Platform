import React from 'react';

const AuthForm = ({ onSubmit, formType, formData, setFormData }) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>{formType === 'login' ? 'Login' : 'Register'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">{formType === 'login' ? 'Login' : 'Register'}</button>
    </form>
  );
};

export default AuthForm;
