import { createSlice } from "@reduxjs/toolkit";

let currentPageUri = undefined

if (typeof window !== 'undefined') {
  currentPageUri = localStorage.getItem('currentPageUri')
}

const initialState = {
  currentPageUri: currentPageUri? currentPageUri: null,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    resetPageSlice: (state) => {
      state.currentPageUri = null;
    },
    setCurrentPageUri: (state, action) => {
      state.currentPageUri = action.payload;
    },
  },
});

export const { resetPageSlice, setCurrentPageUri } = pageSlice.actions;
export default pageSlice.reducer;
