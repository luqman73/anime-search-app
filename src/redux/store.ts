import { configureStore } from "@reduxjs/toolkit";
import animeReducer from "./animeSlice";

export const store = configureStore({
  reducer: {
    anime: animeReducer,
  },
});

// types for useSelector & useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
