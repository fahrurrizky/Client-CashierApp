// import { UPDATE_PROFILE_PICTURE_SUCCESS, CREATE_TRANSACTION_SUCCESS, FETCH_PRODUCTS_SUCCESS } from '../actions/cashierActions';

// const initialState = {
//   profilePicture: null,
//   cart: [],
//   transactions: [],
//   products: [], // State property to hold the fetched product list
//   isLoading: false, // Flag to track if the products are being fetched
//   // Add other cashier-related state properties here if needed
// };

// const cashierReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case UPDATE_PROFILE_PICTURE_SUCCESS:
//       return {
//         ...state,
//         profilePicture: action.payload,
//       };
//     case CREATE_TRANSACTION_SUCCESS:
//       return {
//         ...state,
//         transactions: [...state.transactions, action.payload],
//       };
//     case FETCH_PRODUCTS_SUCCESS:
//       return {
//         ...state,
//         products: action.payload,
//         isLoading: false,
//       };
//     // Add cases for other cashier actions here (e.g., CREATE_TRANSACTION_FAILURE)
//     default:
//       return state;
//   }
// };

// export default cashierReducer;
