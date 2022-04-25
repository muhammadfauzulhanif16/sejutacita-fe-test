import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bookApi } from "./services/bookApi";
import { categoryApi } from "./services/categoryApi";
import { bookmarkReducer } from "./services/bookmarkApi";

export const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    // [bookmarkApi.reducerPath]: bookmarkApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApi.middleware,
      bookApi.middleware
      // bookmarkApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
