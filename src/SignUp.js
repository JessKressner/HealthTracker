import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Retrieve existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username already exists
    const userExists = existingUsers.some((user) => user.username === username);

    if (userExists) {
      alert('Username already exists. Please choose a different username.');
    } else {
      // Add the new user to the users array
      existingUsers.push({ username, password });
      // Save updated users array to localStorage
      localStorage.setItem('users', JSON.stringify(existingUsers));
      alert('Account created successfully! You can now log in.');
      navigate('/login'); // Redirect to the login page after sign-up
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="signup-input"
    />
        </div>
        <div className="form-group">
          <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="signup-input"
    />
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
        <p>
          Already have an account? <a href="/login">Log In</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;