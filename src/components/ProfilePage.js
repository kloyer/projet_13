// src/components/ProfilePage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '../actions/userActions';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Profile fetch failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        
        dispatch(setUserProfile(data.body));
      } catch (error) {
        console.error('Fetch profile error:', error);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [dispatch, token]);

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
          <div class="main-nav-item">
            <i class="fa fa-user-circle"></i>
            Tony
          </div>
          <Link to="/" class="main-nav-item">
            <i class="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      </nav>
      <main className="main bg-dark">
        <div class="header">
          <h1>Welcome back<br />{profile?.firstName} {profile?.lastName}!</h1>
          <button class="edit-button">Edit Name</button>
        </div>
        <h2 class="sr-only">Accounts</h2>
        <section class="account">
          <div class="account-content-wrapper">
            <h3 class="account-title">Argent Bank Checking (x8349)</h3>
            <p class="account-amount">$2,082.79</p>
            <p class="account-amount-description">Available Balance</p>
          </div>
          <div class="account-content-wrapper cta">
            <button class="transaction-button">View transactions</button>
          </div>
        </section>
        <section class="account">
          <div class="account-content-wrapper">
            <h3 class="account-title">Argent Bank Savings (x6712)</h3>
            <p class="account-amount">$10,928.42</p>
            <p class="account-amount-description">Available Balance</p>
          </div>
          <div class="account-content-wrapper cta">
            <button class="transaction-button">View transactions</button>
          </div>
        </section>
        <section class="account">
          <div class="account-content-wrapper">
            <h3 class="account-title">Argent Bank Credit Card (x8349)</h3>
            <p class="account-amount">$184.30</p>
            <p class="account-amount-description">Current Balance</p>
          </div>
          <div class="account-content-wrapper cta">
            <button class="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p class="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

export default ProfilePage;
