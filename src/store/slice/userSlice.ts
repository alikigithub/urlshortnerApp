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
  async (
    { id, userName }: { id: string; userName: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put("/editProfile", {
        id,
        userName,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        return rejectWithValue("Something is wrong");
      }
      if (axiosError.response?.status === 403) {
        return rejectWithValue("Login please");
      }
      return rejectWithValue("Something is wrong");
    }
  }
);

const initialState = {
  name: "",
  email: "",
  verify: "",
  passwordData: "",
  emailData: "",
  isLoading: false,
  error: null as string | null,
};
export const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tokenVerify.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(tokenVerify.fulfilled, (state, action) => {
        state.isLoading = false;
        state.verify = action.payload;
      })
      .addCase(tokenVerify.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(newPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(newPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.passwordData = action.payload;
      })
      .addCase(newPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(emailSent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(emailSent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.emailData = action.payload;
      })
      .addCase(emailSent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(editProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
