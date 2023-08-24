// import {
//   CREATE_CASHIER_SUCCESS,
//   CREATE_CASHIER_FAILURE,
//   UPDATE_CASHIER_STATUS_SUCCESS,
//   UPDATE_CASHIER_STATUS_FAILURE,
//   CREATE_PRODUCT_SUCCESS,
//   CREATE_PRODUCT_FAILURE,
//   UPDATE_PRODUCT_SUCCESS,
//   UPDATE_PRODUCT_FAILURE,
//   DEACTIVATE_PRODUCT_SUCCESS,
//   DEACTIVATE_PRODUCT_FAILURE,
// } from '../actions/adminActions';

// const initialState = {
//   cashiers: [],
//   products: [],
//   // Add other admin-related state properties here if needed
// };

// const adminReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CREATE_CASHIER_SUCCESS:
//       return {
//         ...state,
//         cashiers: [...state.cashiers, action.payload],
//       };
//     case CREATE_CASHIER_FAILURE:
//       // Handle the failure case here, such as displaying an error message
//       return state;
//     case UPDATE_CASHIER_STATUS_SUCCESS:
//       const { cashierId, status } = action.payload;
//       const updatedCashiers = state.cashiers.map((cashier) =>
//         cashier.id === cashierId ? { ...cashier, status } : cashier
//       );
//       return {
//         ...state,
//         cashiers: updatedCashiers,
//       };
//     case UPDATE_CASHIER_STATUS_FAILURE:
//       // Handle the failure case here, such as displaying an error message
//       return state;
//     case CREATE_PRODUCT_SUCCESS:
//       return {
//         ...state,
//         products: [...state.products, action.payload],
//       };
//     case CREATE_PRODUCT_FAILURE:
//       // Handle the failure case here, such as displaying an error message
//       return state;
//     case UPDATE_PRODUCT_SUCCESS:
//       const { productId, productData } = action.payload;
//       const updatedProducts = state.products.map((product) =>
//         product.id === productId ? { ...product, ...productData } : product
//       );
//       return {
//         ...state,
//         products: updatedProducts,
//       };
//     case UPDATE_PRODUCT_FAILURE:
//       // Handle the failure case here, such as displaying an error message
//       return state;
//     case DEACTIVATE_PRODUCT_SUCCESS:
//       const deactivatedProducts = state.products.filter(
//         (product) => product.id !== action.payload
//       );
//       return {
//         ...state,
//         products: deactivatedProducts,
//       };
//     case DEACTIVATE_PRODUCT_FAILURE:
//       // Handle the failure case here, such as displaying an error message
//       return state;
//     // Add other cases for admin actions and their failure cases here
//     default:
//       return state;
//   }
// };

// export default adminReducer;
