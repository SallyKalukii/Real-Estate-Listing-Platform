import React, { useState } from 'react';
import { registerUser } from '../services/authService';  // Import API call

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await registerUser({ email, password });
      setSuccess(`Account created for ${user.email}!`);
      setError('');
      console.log('Registration successful:', user);

      // Optional: Redirect or auto-login
      // navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err.message);
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
