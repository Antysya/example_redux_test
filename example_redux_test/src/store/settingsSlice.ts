import { createSlice } from "@reduxjs/toolkit";
 
const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState: {
    itemsPerPage: 5,
  },
  reducers: {
    setItemsPerPage(state, action) {
      state.itemsPerPage = action.payload;
    },
  },
});
 
export const { setItemsPerPage } = settingsSlice.actions;
export default settingsSlice.reducer;