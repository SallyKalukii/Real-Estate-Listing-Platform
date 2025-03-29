import React, { useState } from 'react';
import { registerUser } from '../services/authService';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const validatePassword = (pass) => {
    // Basic password strength validation
    return pass.length >= 8 && 
           /[A-Z]/.test(pass) && 
           /[a-z]/.test(pass) && 
           /[0-9]/.test(pass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Additional client-side validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and contain uppercase, lowercase, and number');
      return;
    }

    try {
      const user = await registerUser({ email, password });
      setSuccess(`Account created Successfully!`);
      setError('');
      console.log('Registration successful:', user);
    } catch (err) {
      console.error('Registration failed:', err.message);
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="position-relative vh-100 overflow-hidden">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="position-absolute top-0 start-0 w-100 h-100 object-cover"
        style={{
          zIndex: -1,
          filter: 'brightness(0.5)', // Dim the video to improve text readability
          objectFit: 'cover'
        }}
      >
        <source src="/assets/landing.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container py-5 position-relative">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm bg-white bg-opacity-75">
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">Create an Account</h2>
                
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setError('')}
                      aria-label="Close"
                    ></button>
                  </div>
                )}
                
                {success && (
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {success}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setSuccess('')}
                      aria-label="Close"
                    ></button>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-control ${password && !validatePassword(password) ? 'is-invalid' : ''}`}
                      id="passwordInput"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setIsPasswordValid(validatePassword(e.target.value));
                      }}
                      required
                    />
                    {password && !validatePassword(password) && (
                      <div className="invalid-feedback">
                        Password must be at least 8 characters and contain uppercase, lowercase, and number.
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="confirmPasswordInput" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className={`form-control ${confirmPassword && password !== confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPasswordInput"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {confirmPassword && password !== confirmPassword && (
                      <div className="invalid-feedback">
                        Passwords do not match
                      </div>
                    )}
                  </div>
                  
                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={!email || !password || !confirmPassword || !isPasswordValid || password !== confirmPassword}
                    >
                      Register
                    </button>
                  </div>
                </form>
                
                <div className="text-center mt-3">
                  <p className="small text-muted">
                    Already have an account? <a href="/login" className="text-decoration-none">Log in</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;