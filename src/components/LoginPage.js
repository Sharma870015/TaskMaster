import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from './ForgotPasswordModal';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const usernameInputRef = useRef(null);


  // Validate username: must be non-empty and at least 3 characters long
  const validateUsername = (username) => {
    return username.trim().length >= 3; // Adjust as needed
  };

  const validatePassword = (password) => password.length >= 6;

  const handleContinue = () => {
    let isValid = true;

    if (!username || !validateUsername(username)) {
      setUsernameError('Username must be at least 3 characters long');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!password) {
      setPasswordError('Please enter your password');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      navigate('/todos', { state: { username } });
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (!validateUsername(value)) {
      setUsernameError('Username must be at least 3 characters long');
    } else {
      setUsernameError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!validatePassword(value)) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  const handleForgotPassword = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2 className="header-text">Welcome to TaskMaster<br />Your Ultimate Todo Application</h2>
      </div>
      <div className="login-box">
        <h2 className='for-Login'>TaskMaster</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input 
              className='for-padding'
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
            {usernameError && <p className="error-message">{usernameError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              className='for-padding'
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <button type="submit" className="login-button" disabled={usernameError || passwordError}>
            Continue
          </button>
        </form>
        
        <button onClick={handleForgotPassword} className="forgot-password-button">
          Forgot Password?
        </button>
      </div>
      <ForgotPasswordModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default LoginPage;
