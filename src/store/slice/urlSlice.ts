import { UrlState } from "@/types/type";
import axiosInstance from "@/utlis/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
export const urlShortner = createAsyncThunk(
  "urlShortner/createURL",
  async ({ originalLink }: { originalLink: string }, { rejectWithValue }) => {
    try {
      const responce = await axiosInstance.post("/shortUrl", {
        originalLink,
      });
      return responce.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        rejectWithValue("Unothorized Access");
      }
      if (axiosError.response?.status === 403) {
        return rejectWithValue("Login First please");
      }
      rejectWithValue("someting Wrong");
    }
  }
);
export const tableData = createAsyncThunk(
  "urlShortner/tableData",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await axiosInstance.get("/tableData");
      const data = responce.data;
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        return rejectWithValue("Session is Out please Login again");
      }
      if (axiosError.response?.status === 403) {
        return rejectWithValue("Login First please");
      }
      return rejectWithValue("something is wrong");
    }
  }
);
export const updateData = createAsyncThunk(
  "urlShortner/update",
  async (
    {
      id,
      isLocked,
      original,
    }: { id: string; isLocked: boolean; original: string },
    { rejectWithValue }
  ) => {
    try {
      const responce = await axiosInstance.put("/editTable", {
        id,
        isLocked,
        original,
      });
      const data = responce.data;
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 403) {
        return rejectWithValue("Login Please");
      }
      return rejectWithValue("some thing wrong");
    }
  }
);
export const deleteTable = createAsyncThunk(
  "urlShortner/delete",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const resonce = await axiosInstance.delete("/editTable", {
        data: { id },
      });
      const data = resonce.data;
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 403) {
        return rejectWithValue("Login First");
      }
      return rejectWithValue("something is wrong");
    }
  }
);
export const customSlug = createAsyncThunk(
  "generateURL/customSlug",
  async (
    { originalLink, cutomSlug }: { originalLink: string; cutomSlug: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/customSlug", {
        originalLink,
        cutomSlug,
      });
      const data = response.data;
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 403) {
        return rejectWithValue("login Please");
      }
      if (axiosError.response?.status === 401) {
        return rejectWithValue("sorry This Url Already Exists");
      }
    }
  }
);
const initialState: UrlState = {
  allUrls: [],
  searchRemain: 0,
};
export const urlSlice = createSlice({
  name: "urlSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tableData.fulfilled, (state, action) => {
        state.allUrls = action.payload?.reverse();
        state.searchRemain = 5 - state.allUrls.length;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.allUrls = state.allUrls.map((id) =>
          id.id === action.payload.id ? action.payload : id
        );
      })
      .addCase(deleteTable.fulfilled, (state, action) => {
        state.allUrls = state.allUrls.filter(
          (id) => id.id !== action.payload.id
        );
      });
  },
});
export const {} = urlSlice.actions;
export default urlSlice.reducer;
