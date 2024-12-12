import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import './login.css';

const SignupPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    toast.success('Account created successfully!', {
      duration: 2000,
      position: 'top-center',
      style: {
        background: '#4CAF50',
        color: 'white',
        fontSize: '16px',
        padding: '16px',
        borderRadius: '8px'
      }
    });

    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="container">
      <Toaster />
      <div className="left-side">
        <h1 className="brand-name">Plan-it</h1>
      </div>
      <div className="right-side">
        <div className="form-container">
          <h2 className='createAccount'>Create an account</h2>
          <p className='login'>
            <a href="#" onClick={() => navigate('/login')}>Already have an account? Log in</a>
          </p>

          <form className='user-email-pass' onSubmit={handleSubmit}>
            <label htmlFor="username">User name</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="User name" 
              value={formData.username}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="email">Email address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Email address" 
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength="8"
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                {passwordVisible ? 'Hide' : 'Show'}
              </span>
            </div>
            <small>8 or more characters with a mix of letters, numbers & symbols</small>

            <button type="submit" className="create-account-btn">Create an account</button>
          </form>

          <p className="terms">
            By creating an account, you agree to our{' '}
            <a href="#">Terms of use</a> and{' '}
            <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;