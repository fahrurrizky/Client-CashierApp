import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: {
    id: null,
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  login: localStorage.getItem ('token'),
};

export const authreducer = createSlice({
  name: "authreducer",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.login = true;
      localStorage.setItem("token", action.payload);
    },
    logoutSuccess: (state) => {
      state.login = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logoutSuccess } = authreducer.actions;
export default authreducer.reducer;