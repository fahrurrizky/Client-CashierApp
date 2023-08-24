// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/authReducer';
import cashierReducer from './reducers/cashierReducer';
import adminReducer from './reducers/adminReducer';

// const rootReducer = combineReducers({
//   auth: authReducer,
//   cashier: cashierReducer,
//   admin: adminReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cashier: cashierReducer,
    admin: adminReducer,
  },
});