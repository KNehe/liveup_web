import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { modifyResponseMessage } from "../../utils/messages";
import cliniciansService from "./cliniciansService";

const initialState = {
  clinicians: [],
  isLoadingCliniciansError: false,
  isLoadingCliniciansSuccess: false,
  isLoadingClinicians: false,
  loadingCliniciansMessage: "",
};


//Get clinicians
export const getClinicians = createAsyncThunk(
  "clinicians/delete",
  async (_, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.authDetails.access_token;
      return await cliniciansService.getAllClinicians(accessToken);
    } catch (error) {
      const message = modifyResponseMessage(error)
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const clinicianSlice = createSlice({
  name: "clinician",
  initialState,
  reducers: {
    resetClinician: (state) => initialState,
    resetLoadingCliniciansError: (state) => {
      state.isLoadingCliniciansError = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClinicians.pending, (state) => {
        state.isLoadingClinicians = true;
      })
      .addCase(getClinicians.fulfilled, (state, action) => {
        state.isLoadingClinicians = false;
        state.isLoadingCliniciansSuccess = true;
        // reset to empty and push
        state.clinicians = []
        state.clinicians.push(action.payload);
      })
      .addCase(getClinicians.rejected, (state, action) => {
        state.isLoadingClinicians = false;
        state.isLoadingCliniciansError = true;
        state.loadingCliniciansMessage = action.payload;
      })

  },
});

export const { resetLoadingCliniciansError, resetClinician } = clinicianSlice.actions;
export default clinicianSlice.reducer;
