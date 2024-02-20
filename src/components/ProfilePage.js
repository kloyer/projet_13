// ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile, logoutUser } from '../actions/userActions';
import { fetchProfile, updateProfile } from '../services/userService'; // Import service functions
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
    if (token) {
      fetchProfile(token)
        .then(data => {
          dispatch(setUserProfile(data.body));
        })
        .catch(error => {
          console.error('Fetch profile error:', error);
          navigate('/');
        });
    } else {
      navigate('/');
    }
  }, [dispatch, navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logoutUser());
    navigate('/');
  };

  const handleEditClick = () => setEditMode(true);

  const handleSaveClick = async () => {
    try {
      const updatedProfile = await updateProfile(token, firstName, lastName);
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
            <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
          </Link>
          <h1 className="sr-only">Argent Bank</h1>
        </div>
        <div>
          <div className="main-nav-item">
            <i className="fa fa-user-circle"></i>
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
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

export default ProfilePage;