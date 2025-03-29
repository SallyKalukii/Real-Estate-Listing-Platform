import React, { useState } from 'react';
import { loginUser } from '../services/authService';  // Import backend call
import GoogleLoginButton from '../components/GoogleLoginButton';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser({ email, password });
      setSuccess(`Login Successful!`);
      setError('');
      console.log('Login successful:', user);

      // Optional: Redirect to home/dashboard (if using React Router)
      // navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err.message);
      setError(err.message);
      setSuccess('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <source src="assets/landing.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container py-5 position-relative">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm bg-white bg-opacity-75">
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">Welcome Back</h2>
                
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
                    <div className="d-flex justify-content-between">
                      <label htmlFor="passwordInput" className="form-label">Password</label>
                      <a href="/forgot-password" className="small text-decoration-none">Forgot password?</a>
                    </div>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="passwordInput"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button" 
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                  
                  <div className="d-grid mb-3">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={!email || !password}
                    >
                      Log In
                    </button>
                  </div>

                  <div className="text-center mb-3">
                    <span className="text-muted">or</span>
                  </div>

                  <div className="d-grid">
                    <GoogleLoginButton className = "btn btn-outline-secondary"/>
                  </div>
                </form>
                
                <div className="text-center mt-3">
                  <p className="small text-muted">
                    Don't have an account? <a href="/register" className="text-decoration-none">Sign up</a>
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

export default LoginPage;