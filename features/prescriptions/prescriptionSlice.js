import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { modifyResponseMessage } from "../../utils/messages";
import prescriptionService from "./prescriptionService";


const initialState = {
  prescs: [],
  singlePresc: [],
  isLoadingPrescError: false,
  isLoadingPrescSuccess: false,
  isLoadingPresc: false,
  isLoadingPrescMessage: "",
};


//Get all prescs
export const registerPrescription = createAsyncThunk(
  "prescribe/register",
  async (payload, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.authDetails.access_token;
      return await prescriptionService.prescribe(accessToken, payload);
    } catch (error) {
      const message = modifyResponseMessage(error)
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const prescriptionSlice = createSlice({
  name: "prescribe",
  initialState,
  reducers: {
    resetPrescState: (state) => initialState,
    resetLoadingPrescError: (state) => {
      state.isLoadingPrescError = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerPrescription.pending, (state) => {
        state.isLoadingPresc = true;
      })
      .addCase(registerPrescription.fulfilled, (state, action) => {
        state.isLoadingPresc = false;
        state.isLoadingPrescSuccess = true;
        // reset to empty and push
        state.prescs = []
        state.prescs.push(action.payload);
      })
      .addCase(registerPrescription.rejected, (state, action) => {
        state.isLoadingPresc = false;
        state.isLoadingPrescError = true;
        state.isLoadingPrescMessage = action.payload;
      })

  },
});

export const { resetLoadingPrescError, resetPrescState } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;
