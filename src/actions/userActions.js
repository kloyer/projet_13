// src/actions/userActions.js
export const setUsername = (username) => ({
    type: 'SET_USERNAME',
    payload: username,
  });
  
  export const setUserProfile = (profile) => ({
    type: 'SET_USER_PROFILE',
    payload: profile,
  });
  export const logoutUser = () => {
    return {
      type: 'LOGOUT_USER',
    };
  };