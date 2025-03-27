import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <video 
        autoPlay 
        loop 
        muted 
        className="background-video"
      >
        <source 
          src="/assets/landing.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
      
      <div className="video-overlay"></div>
      
      <div className="container-fluid">
        <div className="row vh-100 align-items-center">
          <div className="col-md-8 offset-md-2 text-center text-white">
            <h1 className="display-3 mb-4">Welcome to Home Hive</h1>
            <p className="lead mb-5">
              Your one-stop platform for finding the perfect property
            </p>
            
            <div className="d-flex justify-content-center gap-3">
              <Link to="/login" className="btn btn-primary btn-lg">
                Log In
              </Link>
              <Link to="/register" className="btn btn-outline-light btn-lg">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;