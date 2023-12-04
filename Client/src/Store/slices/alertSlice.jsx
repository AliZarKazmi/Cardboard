import { createSlice } from "@reduxjs/toolkit";

const alertData = createSlice({
  name: "alertData",
  initialState: {
    state: false,
    heading: "",
    content: "",
  },
  reducers: {
    setAlertData(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export default alertData.reducer;

export const { setAlertData } = alertData.actions;
