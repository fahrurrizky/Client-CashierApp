import axios from 'axios';

// Action types
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
// Add other product-related action types as needed

// Action creators
const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});
// Add other product-related action creators as needed

// Thunk action for fetching products
export const fetchProducts = () => async (dispatch) => {
  try {
    // Make an API call to fetch products
    const response = await axios.get('/api/products');

    const products = response.data; // Assuming the API returns the list of products

    dispatch(fetchProductsSuccess(products));
  } catch (error) {
    dispatch(fetchProductsFailure('Failed to fetch products. Please try again.'));
  }
};

// Add other product-related thunk actions as needed
