import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./slices/timerSlice";
import decksReducer from "./slices/decksSlice";

const store = configureStore({
  reducer: {
    timer: timerReducer,
    decks: decksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
