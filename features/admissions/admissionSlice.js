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
};


// Get all wards
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
        state.singleAdmission.push(action.payload);
      })
      .addCase(admitPatient.rejected, (state, action) => {
        state.isAdmitting = false;
        state.isAdmittingError = true;
        state.isAdmittingMessage = action.payload;
      })

  },
});

export const { resetLoadingAdmissionError, resetAdmissionState } = admissionSlice.actions;
export default admissionSlice.reducer;
