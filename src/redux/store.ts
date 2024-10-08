import { configureStore } from "@reduxjs/toolkit";

import todoReducer, { InitialTodo } from "./features/todoSlice";
import v11ProductReducer, { InitialData } from "./features/v11ProductSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    v11Product: v11ProductReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export interface RootState {
  todo: {
    todo: InitialTodo[];
    isEdit: string | null;
    checkedAll: boolean;
  };
}

export interface RootV11Product {
  v11Product: {
    data: InitialData[];
    status: "idle" | "loading" | "failed" | "succeeded";
    error: string | null | unknown;
    singleData: InitialData | null;
    singleStatus: "idle" | "loading" | "failed" | "succeeded";
    singleError: string | null | unknown;
  };
}

export type RootV1Product = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
