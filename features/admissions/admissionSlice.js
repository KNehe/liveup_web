import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { modifyResponseMessage } from "../../utils/messages";
import admitService from "./admissionService";

const initialState = {
  admissions: [],
  singleAdmission: [],
  isAdmittingError: false,
  isAdmittingSuccess: false,
  isAdmitting: false,
  isAdmittingMessage: "",

  isLoadingAdmissionError: false,
  isLoadingAdmissionSuccess: false,
  isLoadingAdmission: false,
  isLoadingAdmissionMessage: "",

  isUpdatingAdmissionError: false,
  isUpdatingAdmissionSuccess: false,
  isUpdatingAdmission: false,
  isUpdatingAdmissionMessage: "",
};


// Admit a patient
export const admitPatient = createAsyncThunk(
  "admit/patient",
  async (data, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.authDetails.access_token;
      return await admitService.admitPatient(accessToken, data);
    } catch (error) {
      const message = modifyResponseMessage(error)
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Fetch a patient's admissions
export const getAdmissions = createAsyncThunk(
  "admit/get_all",
  async (patient_id, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.authDetails.access_token;
      return await admitService.getAdmissions(accessToken, patient_id);
    } catch (error) {
      const message = modifyResponseMessage(error)
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Update admission
export const updateAdmission = createAsyncThunk(
  "admit/update",
  async (data, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.authDetails.access_token;
      const {admissionUri} = data
      return await admitService.updateAmission(accessToken, admissionUri, data);
    } catch (error) {
      const message = modifyResponseMessage(error)
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const admissionSlice = createSlice({
  name: "admit",
  initialState,
  reducers: {
    resetAdmissionState: (state) => initialState,
    resetLoadingAdmissionError: (state) => {
      state.isAdmittingError = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admitPatient.pending, (state) => {
        state.isAdmitting = true;
      })
      .addCase(admitPatient.fulfilled, (state, action) => {
        state.isAdmitting = false;
        state.isAdmittingSuccess = true;
        // reset to empty and push
        state.singleAdmission = []
        state.singleAdmission.push(...action.payload);
      })
      .addCase(admitPatient.rejected, (state, action) => {
        state.isAdmitting = false;
        state.isAdmittingError = true;
        state.isAdmittingMessage = action.payload;
      })
      .addCase(getAdmissions.pending, (state) => {
        state.isLoadingAdmission = true;
      })
      .addCase(getAdmissions.fulfilled, (state, action) => {
        state.isLoadingAdmission = false;
        state.isLoadingAdmissionSuccess = true;
        // reset to empty and push
        state.admissions = []
        state.admissions.push(...action.payload);
      })
      .addCase(getAdmissions.rejected, (state, action) => {
        state.isLoadingAdmission = false;
        state.isLoadingAdmissionError = true;
        state.isLoadingAdmissionMessage = action.payload;
      })
      .addCase(updateAdmission.pending, (state) => {
        state.isUpdatingAdmission = true;
      })
      .addCase(updateAdmission.fulfilled, (state, action) => {
        state.isUpdatingAdmission = false;
        state.isUpdatingAdmissionSuccess = true;
        // reset to empty and push
        state.singleAdmission = []
        state.singleAdmission.push(action.payload);
      })
      .addCase(updateAdmission.rejected, (state, action) => {
        state.isUpdatingAdmission = false;
        state.isUpdatingAdmissionError = true;
        state.isUpdatingAdmissionMessage = action.payload;
      })

  },
});

export const { resetLoadingAdmissionError, resetAdmissionState } = admissionSlice.actions;
export default admissionSlice.reducer;
