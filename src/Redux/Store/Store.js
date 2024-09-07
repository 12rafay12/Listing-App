import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { CardSlice } from "../Slices/CardSlice";
export const store = configureStore({
  reducer: {
    [CardSlice.reducerPath]: CardSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CardSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
