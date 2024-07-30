import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Assuming you have a CSS file for styling

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (email && password) {
      navigate('/todos', { state: { email } }); // Pass email as state
    } else {
      alert('Please enter both email and password');
    }
  };

  const handleForgotPassword = () => {
    alert("You didn't forget your password.");
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2 className="header-text">TaskMaster makes project <br></br> management easy</h2>
      </div>
      <div className="login-box">
        <h2 className='for-Login'>Login</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Continue</button>
        </form>
        
        <button onClick={handleForgotPassword} className="forgot-password-button">
          Forgot Password?
        </button>
        
      </div>
      
    </div>
  );
};

export default LoginPage;
