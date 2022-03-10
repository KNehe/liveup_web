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

  isUpdatingPrescError: false,
  isUpdatingPrescSuccess: false,
  isUpdatingPresc: false,
  isUpdatingPrescMessage: "",

  isLoadingPrescriptionHistoryError: false,
};

// Register all prescription
export const registerPrescription = createAsyncThunk(
  "prescribe/register",
  async (payload, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.authDetails.access_token;
      return await prescriptionService.prescribe(accessToken, payload);
    } catch (error) {
      const message = modifyResponseMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// fetch all prescription
export const getPrescriptions = createAsyncThunk(
  "prescribe/getall",
  async (patient_id, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.authDetails.access_token;
      return await prescriptionService.getPatientPrescriptions(
        accessToken,
        patient_id
      );
    } catch (error) {
      const message = modifyResponseMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update a prescription
export const updatePrescription = createAsyncThunk(
  "prescribe/update",
  async (data, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.authDetails.access_token;
      const { prescriptionUri } = data;
      return await prescriptionService.updatePrescription(
        accessToken,
        prescriptionUri,
        data
      );
    } catch (error) {
      const message = modifyResponseMessage(error);
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
      state.isLoadingPrescError = false;
    },
    resetUpdaingPrescError: (state) => {
      state.isUpdatingPrescError = false;
    },
    resetLoadingPrescriptionHistoryError: (state) => {
      state.isLoadingPrescriptionHistoryError = false;
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
        state.prescs = [];
        state.prescs.push(...action.payload);
      })
      .addCase(registerPrescription.rejected, (state, action) => {
        state.isLoadingPresc = false;
        state.isLoadingPrescError = true;
        state.isLoadingPrescMessage = action.payload;
      })
      .addCase(getPrescriptions.pending, (state) => {
        state.isLoadingPresc = true;
      })
      .addCase(getPrescriptions.fulfilled, (state, action) => {
        state.isLoadingPresc = false;
        state.isLoadingPrescSuccess = true;
        // reset to empty and push
        state.prescs = [];
        state.prescs.push(...action.payload);
      })
      .addCase(getPrescriptions.rejected, (state, action) => {
        state.isLoadingPresc = false;
        state.isLoadingPrescriptionHistoryError = true;
        state.isLoadingPrescMessage = action.payload;
        state.prescs = [];
      })
      .addCase(updatePrescription.pending, (state) => {
        state.isUpdatingPresc = true;
      })
      .addCase(updatePrescription.fulfilled, (state, action) => {
        state.isUpdatingPresc = false;
        state.isUpdatingPrescSuccess = true;
        // reset to empty and push
        state.prescs = [];
        state.singlePresc.push(action.payload);
      })
      .addCase(updatePrescription.rejected, (state, action) => {
        state.isUpdatingPresc = false;
        state.isUpdatingPrescError = true;
        state.isUpdatingPrescMessage = action.payload;
      });
  },
});

export const {
  resetLoadingPrescError,
  resetPrescState,
  resetUpdaingPrescError,
  resetLoadingPrescriptionHistoryError,
} = prescriptionSlice.actions;
export default prescriptionSlice.reducer;
