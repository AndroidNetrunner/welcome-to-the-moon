import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  remainedTime: 40,
  timeLimit: 40,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    resetTimer: (state) => {
      state.remainedTime = state.timeLimit;
    },
    setTimeLimit: (state, { payload }) => {
      state.timeLimit = payload;
    },
    spendNextSecond: (state) => {
      if (state.remainedTime > 0) state.remainedTime -= 1;
    },
  },
});

export const { resetTimer, setTimeLimit, spendNextSecond } = timerSlice.actions;

export const selectRemainedTime = (state: RootState) =>
  state.timer.remainedTime;
export const selectTimeLimit = (state: RootState) => state.timer.timeLimit;
export default timerSlice.reducer;
