import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slice/userSlice";
import { urlSlice } from "./slice/urlSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    url: urlSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
