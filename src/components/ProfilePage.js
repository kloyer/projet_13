// src/components/ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile, logoutUser } from '../actions/userActions';
import { useNavigate, Link } from 'react-router-dom';
import argentBankLogo from '../img/argentBankLogo.png';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.user.profile);
  const token = localStorage.getItem('token');
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(profile?.firstName || '');
  const [lastName, setLastName] = useState(profile?.lastName || '');

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
        
        dispatch(setUserProfile(data.body));
      } catch (error) {
        console.error('Fetch profile error:', error);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [dispatch, token]);

  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear token from localStorage
    dispatch(logoutUser());  // Dispatch logout action to reset state
    navigate('/login');  // Redirect user to login page
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (!response.ok) {
        throw new Error(`Update failed with status: ${response.status}`);
      }

      const updatedProfile = await response.json();
      dispatch(setUserProfile(updatedProfile.body));
      setEditMode(false);
    } catch (error) {
      console.error('Update profile error:', error);
    }
  };

  return (
    <>
      <nav className="main-nav">
      <div className="main-nav-logo">
          <Link to="/">
            <img class="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
          </Link>
          <h1 class="sr-only">Argent Bank</h1>
        </div>
        <div>
          <div class="main-nav-item">
            <i class="fa fa-user-circle"></i>
            {profile?.firstName || 'undefined'}
          </div>
          <Link to="/" className="main-nav-item" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      </nav>
      <main className="main bg-dark">
      <div className="header">
        {!editMode ? (
          <h1>Welcome back<br />{profile?.firstName || 'undefined'} {profile?.lastName || 'undefined'}</h1>
        ) : (
          <>
            <input value={firstName} onChange={e => setFirstName(e.target.value)} />
            <input value={lastName} onChange={e => setLastName(e.target.value)} />
          </>
        )}
        {!editMode ? (
          <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
        ) : (
          <button className="edit-button" onClick={handleSaveClick}>Save</button>
        )}
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
