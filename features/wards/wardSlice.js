import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { modifyResponseMessage } from "../../utils/messages";
import wardService from "./wardService";

const initialState = {
  wards: [],
  singleWard: [],
  isLoadingWardError: false,
  isLoadingWardSuccess: false,
  isLoadingWard: false,
  isLoadingWardMessage: "",
};


//Get all wards
export const getAllWards = createAsyncThunk(
  "ward/fetchAll",
  async (_, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.authDetails.access_token;
      return await wardService.getAllWards(accessToken);
    } catch (error) {
      const message = modifyResponseMessage(error)
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const wardSlice = createSlice({
  name: "ward",
  initialState,
  reducers: {
    resetWardState: (state) => initialState,
    resetLoadingWardError: (state) => {
      state.isLoadingWardError = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWards.pending, (state) => {
        state.isLoadingWard = true;
      })
      .addCase(getAllWards.fulfilled, (state, action) => {
        state.isLoadingWard = false;
        state.isLoadingWardSuccess = true;
        // reset to empty and push
        state.wards = []
        state.wards.push(action.payload);
      })
      .addCase(getAllWards.rejected, (state, action) => {
        state.isLoadingWard = false;
        state.isLoadingWardError = true;
        state.isLoadingWardMessage = action.payload;
      })

  },
});

export const { resetLoadingWardError, resetWardState } = wardSlice.actions;
export default wardSlice.reducer;
