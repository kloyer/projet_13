// src/reducers/userReducers.js

const initialState = {
  username: null,
  profile: null,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_USER_PROFILE':
      return { ...state, profile: action.payload };
    case 'LOGOUT_USER':
      return { ...initialState };
    default:
      return state;
  }
}
