import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type LoginType = {
  username: string;
  password: string;
  isLoggedIn: boolean;
};

const LoginState: LoginType = {
  username: "",
  password: "",
  isLoggedIn: false,
};

const LoginSlice = createSlice({
  name: "Login",
  initialState: LoginState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setisLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUsername, setPassword, setisLoggedIn } = LoginSlice.actions;
export default LoginSlice.reducer;

export const getUsername = (state: RootState) => {
  return state.Login.username;
};

export const getisLoggedIn = (state: RootState) => {
  return state.Login.isLoggedIn;
};
