import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Retrieve existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  
    // Check if user exists and password matches
    const user = existingUsers.find(
      (user) => user.username === username && user.password === password
    );
  
    if (user) {
      // Set authentication flag and store username
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', username); // Store the logged-in username
      alert('Login successful!');
      navigate('/dashboard'); // Redirect to the dashboard after login
    } else {
      alert('Invalid username or password.');
    }
  };

  return (
    <div className="login-page-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">Login</button>
      <p className="signup-text">
        Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
      </p>
    </div>
  );
}

export default LoginPage;