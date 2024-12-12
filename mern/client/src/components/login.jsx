import React, { useState } from 'react';
import './Login.css';

const SignupPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container">
      {/* Left side with gradient background */}
      <div className="left-side"></div>

      {/* Right side with form */}
      <div className="right-side">
        <div className="form-container">
          <h2 className='createAccount'>Create an account</h2>
          <p className='login'>
            <a href="#">Already have an account? Log in</a>
          </p>

          <form className='user-email-pass'>
            <label htmlFor="username">User name</label>
            <input type="text" id="username" name="username" placeholder="User name" />

            <label htmlFor="email">Email address</label>
            <input type="email" id="email" name="email" placeholder="Email address" />

            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Password"
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                {passwordVisible ? 'Hide' : 'Show'}
              </span>
            </div>
            <small> 8 or more characters with a mix of letters, numbers & symbols</small>

            <button type="submit"> <a href="#">Create an account</a></button>
          </form>

          <p>
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