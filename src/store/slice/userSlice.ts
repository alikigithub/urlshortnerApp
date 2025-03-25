import axiosInstance from "@/utlis/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (
    {
      userName,
      email,
      password,
    }: { userName: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/signup", {
        userName,
        email,
        password,
      });
      const data = response.data;
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        return rejectWithValue("All fields are required");
      }
      if (axiosError.response?.status === 405) {
        return rejectWithValue("This Email already exists");
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

export const emailSent = createAsyncThunk(
  "resetPassword/email",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("forgetPassword", {
        email,
      });
      const data = response.data;
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 405) {
        return rejectWithValue("This Email is not registered");
      }
      return rejectWithValue("something went wrong");
    }
  }
);
export const tokenVerify = createAsyncThunk(
  "passwordUpdate/tokenVerify",
  async ({ token }: { token: string }) => {
    const response = await axiosInstance.get(`/tokenVerify?token=${token}`);
    const data = response.data;
    return data;
  }
);
export const newPassword = createAsyncThunk(
  "passwordUpdate/newPassword",
  async (
    { token, password }: { token: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/newPassword", {
        token,
        password,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 403) {
        return rejectWithValue("invalid token");
      }
      if (axiosError.response?.status === 404) {
        return rejectWithValue("Your Token Has been expired please re-try");
      }
      return rejectWithValue("other erros");
    }
  }
);
export const changePassword = createAsyncThunk(
  "passwordChange/user",
  async (
    { oldPassword, newpassword }: { oldPassword: string; newpassword: string },
    { rejectWithValue }
  ) => {
    try {
      const responce = await axiosInstance.put(`/changePassword`, {
        oldPassword,
        newpassword,
      });
      return responce;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        return rejectWithValue("Please Login First");
      }
      if (axiosError.response?.status === 404) {
        return rejectWithValue("No User Exists");
      }
      if (axiosError.response?.status === 405) {
        return rejectWithValue("Your Old Password is incorrect");
      }
    }
  }
);
export const editProfile = createAsyncThunk(
  "EditProfile/UserName",
  async ({ id, userName }: { id: string; userName: string }) => {
    try {
      const responce = await axiosInstance.put("/editProfile", {
        id,
        userName,
      });
      const data = await responce.data;
      return data;
    } catch (error) {
      const axiosErro = error as AxiosError;
      if (axiosErro.request?.status === 401) {
        return Response.json("Something is wrong");
      }
      if (axiosErro.request?.status === 403) {
        return Response.json("Login please");
      }
      return Response.json("Something is wrong");
    }
  }
);
const initialState = {
  name: "",
  email: "",
  verify: "",
  passwordData: "",
  emailData: "",
};
export const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tokenVerify.fulfilled, (state, action) => {
        state.verify = action.payload;
      })
      .addCase(newPassword.fulfilled, (state, action) => {
        state.passwordData = action.payload;
      })
      .addCase(emailSent.fulfilled, (state, action) => {
        state.emailData = action.payload;
      });
  },
});

export default userSlice.reducer;
