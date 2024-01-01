// src/components/LoginPage.js
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUsername } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();
      localStorage.setItem('token', data.body.token);
      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <nav className="main-nav">
      <div className="main-nav-logo">
          <Link to="/">
            <img class="main-nav-logo-image" src="../img/argentBankLogo.png" alt="Argent Bank Logo" />
          </Link>
          <h1 class="sr-only">Argent Bank</h1>
        </div>
      <div>
        <Link to ="/login" className="main-nav-item">
          <i class="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
      </nav>
      <main className="main bg-dark">
        <section class="sign-in-content">
          <i class="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleLogin}>
            <div class="input-wrapper">
              <label for="username">Username</label>
              <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div class="input-wrapper">
              <label for="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div class="input-remember">
              <input type="checkbox" id="remember-me" />
              <label for="remember-me">Remember me</label>
            </div>
            <button type="submit" class="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
      <footer className="footer">
        <p class="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

export default LoginPage;
