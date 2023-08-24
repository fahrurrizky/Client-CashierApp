import axios from 'axios';

// Action types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

// Action creators
const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
});

const resetPasswordFailure = (error) => ({
  type: RESET_PASSWORD_FAILURE,
  payload: error,
});

// Thunk action for login
export const login = (username, password) => async (dispatch) => {
  try {
    // Make an API call to authenticate user
    const response = await axios.post('/api/login', { username, password });
    const user = response.data; // Assuming the API returns the user data upon successful login
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure('Invalid credentials. Please try again.'));
  }
};

// Thunk action for reset password
export const resetPassword = (email) => async (dispatch) => {
  try {
    // Make an API call to send reset password link
    await axios.post('/api/reset-password', { email });
    dispatch(resetPasswordSuccess());
  } catch (error) {
    dispatch(resetPasswordFailure('Failed to send reset password link. Please try again.'));
  }
};
