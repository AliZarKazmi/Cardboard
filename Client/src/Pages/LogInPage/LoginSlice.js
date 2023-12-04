import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "Login",
  initialState: {
    Login: false,
    Email: "",
  },
  reducers: {
    setLogin(state, action) {
      state.Login = action.payload.login;
      state.Email = action.payload.email;
    },
    setEmail(state, action) {
      state.Email = action.payload.email;
    },
  },
});
export const selectLogin = (state) => {
  return state.LoginSlice.Login;
};
export const selectEmail = (state) => {
  return state.LoginSlice.Email;
};

export const { setLogin, setEmail } = LoginSlice.actions;
export default LoginSlice.reducer;
