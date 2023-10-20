import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLoginFunction, userRegisterFunction } from "../Services/Apis";

const initialState = {
  token: sessionStorage.getItem("token"),
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
  password: "",
  role: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      const response = await userRegisterFunction({
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
        password: values.password,
        role: values.role,
      });

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      const response = await userLoginFunction({
        email: values.email,
        password: values.password,
      });
      console.log(response);

      sessionStorage.setItem("token", response.data);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {
        ...state,
        token: action.payload,
        registerStatus: "success",
      };
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
  },
});

export default authSlice.reducer;
