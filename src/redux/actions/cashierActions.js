import axios from 'axios';

// Action types
const UPDATE_PROFILE_PICTURE_SUCCESS = 'UPDATE_PROFILE_PICTURE_SUCCESS';
const UPDATE_PROFILE_PICTURE_FAILURE = 'UPDATE_PROFILE_PICTURE_FAILURE';
const CREATE_TRANSACTION_SUCCESS = 'CREATE_TRANSACTION_SUCCESS';
const CREATE_TRANSACTION_FAILURE = 'CREATE_TRANSACTION_FAILURE';
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

// Action creators
const updateProfilePictureSuccess = (imageUrl) => ({
  type: UPDATE_PROFILE_PICTURE_SUCCESS,
  payload: imageUrl,
});

const updateProfilePictureFailure = (error) => ({
  type: UPDATE_PROFILE_PICTURE_FAILURE,
  payload: error,
});

const createTransactionSuccess = (transaction) => ({
  type: CREATE_TRANSACTION_SUCCESS,
  payload: transaction,
});

const createTransactionFailure = (error) => ({
  type: CREATE_TRANSACTION_FAILURE,
  payload: error,
});

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

// Thunk action for updating profile picture
export const updateProfilePicture = (file) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('profilePicture', file);

    // Make an API call to upload the profile picture
    const response = await axios.post('/api/upload-profile-picture', formData);

    // Assuming the API returns the image URL after successful upload
    const imageUrl = response.data.imageUrl;

    dispatch(updateProfilePictureSuccess(imageUrl));
  } catch (error) {
    dispatch(updateProfilePictureFailure('Failed to update profile picture. Please try again.'));
  }
};

// Thunk action for creating a new transaction
export const createTransaction = (cartItems, amountPaid, changeAmount) => async (dispatch) => {
  try {
    // You can perform additional calculations or API calls here if needed
    // For example, sending the cartItems, amountPaid, and changeAmount to the backend API

    // Assuming the API call is successful and returns the new transaction data
    const response = await axios.post('/api/create-transaction', {
      cartItems,
      amountPaid,
      changeAmount,
    });

    const newTransaction = response.data; // Assuming the API returns the new transaction data

    dispatch(createTransactionSuccess(newTransaction));
  } catch (error) {
    dispatch(createTransactionFailure('Failed to create a new transaction. Please try again.'));
  }
};

// Thunk action for fetching product list
export const fetchProducts = () => async (dispatch) => {
  try {
    // Make an API call to fetch the product list
    const response = await axios.get('/api/products');

    const products = response.data; // Assuming the API returns an array of product objects

    dispatch(fetchProductsSuccess(products));
  } catch (error) {
    dispatch(fetchProductsFailure('Failed to fetch product list. Please try again.'));
  }
};
