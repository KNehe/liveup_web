import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { modifyResponseMessage } from "../../utils/messages";
import patientService from "./patientService";

const initialState = {
  assignedPatients: [],
  isLoadingPatients: false,
  isLoadingPatientsError: false,
  isLoadingPatientsSuccess: false,
  message: '',
};

// get assignedPatients assigned to clinician
export const getAssignedPatients = createAsyncThunk(
  "clinicians/get-assignedPatients",
  async (next_page_url, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.authDetails.access_token;
      return await patientService.aggregateAssignedPatientsData(
        next_page_url,
        accessToken
      );
    } catch (error) {
      const message = modifyResponseMessage(error)
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const assignedPatientSlice = createSlice({
  name: "assigned-patient",
  initialState,
  reducers: {
    resetPatient: (state) => initialState,
    resetPatientError: (state) => {
      state.isLoadingPatientsError = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAssignedPatients.pending, (state) => {
        state.isLoadingPatients = true;
      })
      .addCase(getAssignedPatients.fulfilled, (state, action) => {
        state.isLoadingPatients = false;
        state.isLoadingPatientsSuccess = true;
        // reset to empty and push
        state.assignedPatients = []
        state.assignedPatients.push(action.payload);
      })
      .addCase(getAssignedPatients.rejected, (state, action) => {
        state.isLoadingPatients = false;
        state.isLoadingPatientsError = true;
        state.message = action.payload;
      })
  },
});

export const {resetPatientError } = assignedPatientSlice.actions;
export default assignedPatientSlice.reducer;
