import React, { useState } from 'react';
import './UserLogin.css';

function UserLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
      setUserInfo({
        name: 'John Doe',
        email: 'john.doe@example.com',
        mood: 'Happy',
      });
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="user-login-container">
      {isLoggedIn ? (
        <div className="user-info">
          <h2>Welcome, {userInfo.name}</h2>
          <p>Email: {userInfo.email}</p>
          <p>Current Mood: {userInfo.mood}</p>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      ) : (
        <div className="login-form">
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
        </div>
      )}
    </div>
  );
}

export default UserLogin;
