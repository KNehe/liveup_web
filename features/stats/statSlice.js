import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { modifyResponseMessage } from "../../utils/messages";
import statService from "./statService";

const initialState = {
  stats: {},
  isStatError: false,
  isStatSuccess: false,
  isStatLoading: false,
  statMessage: "",
};

//Get receptionist statistics
export const getReceptionistStats = createAsyncThunk(
  "receptionist/stats",
  async (_, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.authDetails.access_token;
      return await statService.fetchReceptionistStats(accessToken);
    } catch (error) {
      const statMessage = modifyResponseMessage(error);
      return thunkAPI.rejectWithValue(statMessage);
    }
  }
);

//Get clinician statistics
export const getClinicianStats = createAsyncThunk(
  "clinicians/stats",
  async (_, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.authDetails.access_token;
      return await statService.fetchClinicianStats(accessToken);
    } catch (error) {
      const statMessage = modifyResponseMessage(error);
      return thunkAPI.rejectWithValue(statMessage);
    }
  }
);
export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    resetStats: (state) => initialState,
    resetError: (state) => {
      state.isStatError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReceptionistStats.pending, (state) => {
        state.isStatLoading = true;
      })
      .addCase(getReceptionistStats.fulfilled, (state, action) => {
        state.isStatLoading = false;
        state.isReferringSuccess = true;
        state.stats = action.payload;
      })
      .addCase(getReceptionistStats.rejected, (state, action) => {
        state.isStatLoading = false;
        state.isStatError = true;
        state.statMessage = action.payload;
      })
      .addCase(getClinicianStats.pending, (state) => {
        state.isStatLoading = true;
      })
      .addCase(getClinicianStats.fulfilled, (state, action) => {
        state.isStatLoading = false;
        state.isReferringSuccess = true;
        state.stats = action.payload;
      })
      .addCase(getClinicianStats.rejected, (state, action) => {
        state.isStatLoading = false;
        state.isStatError = true;
        state.statMessage = action.payload;
      });
  },
});

export const { resetStats, resetError } = statsSlice.actions;
export default statsSlice.reducer;
