import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import patientService from "./patientService";

const initialState = {
  patients: [],
  isError: false,
  isSuccess: false,
  isLoadingPatients: false,
  message: "",
};

// get patients registered receptionist
export const getPatientsForRecep = createAsyncThunk(
    'rececptionists/getall',
    async (next_page_url, thunkAPI) => {
      try {
        const accessToken = thunkAPI.getState().auth.authDetails.access_token;
        return await patientService.getPatientsRegisteredByReceptionist(
            next_page_url,
            accessToken
          );
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    resetPatient: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPatientsForRecep.pending, (state) => {
        state.isLoadingPatients = true;
      })
      .addCase(getPatientsForRecep.fulfilled, (state, action) => {
        state.isLoadingPatients = false
        state.isSuccess = true
        state.patients.push(action.payload)
      })
      .addCase(getPatientsForRecep.rejected, (state, action) => {
        state.isLoadingPatients = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetPatient } = patientSlice.actions;
export default patientSlice.reducer;
