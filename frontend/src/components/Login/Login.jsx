import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {
  render() {
    return (
      <div className="login-container">
        <form className="login-form">
          <h3>Log In</h3>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group custom-checkbox">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          <button type="submit" className="btn">
            Submit
          </button>

          <p className="forgot-password">
            Forgot <a href="#">password?</a>
          </p>
        </form>
      </div>
    );
  }
}
