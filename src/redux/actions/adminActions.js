import axios from 'axios';

// Action types
const CREATE_CASHIER_SUCCESS = 'CREATE_CASHIER_SUCCESS';
const CREATE_CASHIER_FAILURE = 'CREATE_CASHIER_FAILURE';
const UPDATE_CASHIER_STATUS_SUCCESS = 'UPDATE_CASHIER_STATUS_SUCCESS';
const UPDATE_CASHIER_STATUS_FAILURE = 'UPDATE_CASHIER_STATUS_FAILURE';
const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';
const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';
const DEACTIVATE_PRODUCT_SUCCESS = 'DEACTIVATE_PRODUCT_SUCCESS';
const DEACTIVATE_PRODUCT_FAILURE = 'DEACTIVATE_PRODUCT_FAILURE';
const ADD_PRODUCT_CATEGORY_SUCCESS = 'ADD_PRODUCT_CATEGORY_SUCCESS';
const ADD_PRODUCT_CATEGORY_FAILURE = 'ADD_PRODUCT_CATEGORY_FAILURE';
export const ADMIN_LOGIN_SUCCESS = 'ADMIN_LOGIN_SUCCESS';
export const ADMIN_LOGIN_FAILURE = 'ADMIN_LOGIN_FAILURE';

// Action creators
const createCashierSuccess = (cashier) => ({
  type: CREATE_CASHIER_SUCCESS,
  payload: cashier,
});

const createCashierFailure = (error) => ({
  type: CREATE_CASHIER_FAILURE,
  payload: error,
});

const updateCashierStatusSuccess = (cashierId, status) => ({
  type: UPDATE_CASHIER_STATUS_SUCCESS,
  payload: { cashierId, status },
});

const updateCashierStatusFailure = (error) => ({
  type: UPDATE_CASHIER_STATUS_FAILURE,
  payload: error,
});

const createProductSuccess = (product) => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: product,
});

const createProductFailure = (error) => ({
  type: CREATE_PRODUCT_FAILURE,
  payload: error,
});

const updateProductSuccess = (productId, productData) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: { productId, productData },
});

const updateProductFailure = (error) => ({
  type: UPDATE_PRODUCT_FAILURE,
  payload: error,
});

const deactivateProductSuccess = (productId) => ({
  type: DEACTIVATE_PRODUCT_SUCCESS,
  payload: productId,
});

const deactivateProductFailure = (error) => ({
  type: DEACTIVATE_PRODUCT_FAILURE,
  payload: error,
});

const addProductCategorySuccess = (category) => ({
  type: ADD_PRODUCT_CATEGORY_SUCCESS,
  payload: category,
});

const addProductCategoryFailure = (error) => ({
  type: ADD_PRODUCT_CATEGORY_FAILURE,
  payload: error,
});

// Action creator for admin login success
const adminLoginSuccess = (adminData) => ({
  type: ADMIN_LOGIN_SUCCESS,
  payload: adminData,
});

// Action creator for admin login failure
const adminLoginFailure = (error) => ({
  type: ADMIN_LOGIN_FAILURE,
  payload: error,
});

// Thunk action for creating a new cashier
export const createCashier = (cashierData) => async (dispatch) => {
  try {
    // Make an API call to create a new cashier
    const response = await axios.post('/api/create-cashier', cashierData);

    const newCashier = response.data; // Assuming the API returns the new cashier data

    dispatch(createCashierSuccess(newCashier));
  } catch (error) {
    dispatch(createCashierFailure('Failed to create a new cashier. Please try again.'));
  }
};

// Thunk action for updating cashier status
export const updateCashierStatus = (cashierId, status) => async (dispatch) => {
  try {
    // Make an API call to update cashier status
    await axios.put(`/api/update-cashier-status/${cashierId}`, { status });

    dispatch(updateCashierStatusSuccess(cashierId, status));
  } catch (error) {
    dispatch(updateCashierStatusFailure('Failed to update cashier status. Please try again.'));
  }
};

// Thunk action for creating a new product
export const createProduct = (productData) => async (dispatch) => {
  try {
    // Make an API call to create a new product
    const response = await axios.post('/api/create-product', productData);

    const newProduct = response.data; // Assuming the API returns the new product data

    dispatch(createProductSuccess(newProduct));
  } catch (error) {
    dispatch(createProductFailure('Failed to create a new product. Please try again.'));
  }
};

// Thunk action for updating a product
export const updateProduct = (productId, productData) => async (dispatch) => {
  try {
    // Make an API call to update product details
    await axios.put(`/api/update-product/${productId}`, productData);

    dispatch(updateProductSuccess(productId, productData));
  } catch (error) {
    dispatch(updateProductFailure('Failed to update product details. Please try again.'));
  }
};

// Thunk action for deactivating a product
export const deactivateProduct = (productId) => async (dispatch) => {
  try {
    // Make an API call to deactivate a product
    await axios.delete(`/api/deactivate-product/${productId}`);

    dispatch(deactivateProductSuccess(productId));
  } catch (error) {
    dispatch(deactivateProductFailure('Failed to deactivate the product. Please try again.'));
  }
};

export const addProductCategory = (categoryData) => async (dispatch) => {
  try {
    // Make an API call to add a new product category
    const response = await axios.post('/api/add-product-category', categoryData);

    const newCategory = response.data; // Assuming the API returns the new category data

    dispatch(addProductCategorySuccess(newCategory));
  } catch (error) {
    dispatch(addProductCategoryFailure('Failed to add a new product category. Please try again.'));
  }
};

export const adminLogin = (username, password) => async (dispatch) => {
  try {
    // Make an API call to authenticate the admin
    const response = await axios.post('/api/admin/login', { username, password });

    const adminData = response.data; // Assuming the API returns admin data upon successful login

    dispatch(adminLoginSuccess(adminData));
  } catch (error) {
    dispatch(adminLoginFailure('Failed to log in. Please check your credentials.'));
  }
};