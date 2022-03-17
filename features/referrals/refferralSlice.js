import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { modifyResponseMessage } from "../../utils/messages";
import referralService from "./refferralService";

const initialState = {
  referrals: [],
  singleReferral: [],
  isReferringError: false,
  isReferringSuccess: false,
  isReferring: false,
  referringMessage: "",

  isUpdatingReferral: false,
  isUpdatingReferralError: false,
  isUpdatingReferralSuccess: false,
  isUpdatingReferralMessage: "",

  isLoadingReferrals: false,
  isLoadingReferralsError: false,
  isLoadingReferralsSuccess: false,
  isLoadingReferralsMessage: "",
};

//Get singleReferral
export const referPatient = createAsyncThunk(
  "receptionist/refer",
  async (referal, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.authDetails.access_token;
      return await referralService.referPatient(accessToken, referal);
    } catch (error) {
      const message = modifyResponseMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update referral
export const updateReferral = createAsyncThunk(
  "referral/update",
  async (referalData, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.authDetails.access_token;
      const { referralUri } = referalData;
      return await referralService.updateReferral(
        accessToken,
        referralUri,
        referalData
      );
    } catch (error) {
      const message = modifyResponseMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// fetch referrals for a patient
export const getReferrals = createAsyncThunk(
  "referral/get",
  async (patientId, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.authDetails.access_token;
      return await referralService.getReferralsForPatient(
        accessToken,
        patientId
      );
    } catch (error) {
      const message = modifyResponseMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const referralSlice = createSlice({
  name: "referral",
  initialState,
  reducers: {
    resetClinician: (state) => initialState,
    resetLoadingCliniciansError: (state) => {
      state.isReferringError = false;
    },
    resetUpdateReferralError: (state) => {
      state.isUpdatingReferralError = false;
    },
    resetLoadReferralError: (state) => {
      state.isLoadingReferralsError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(referPatient.pending, (state) => {
        state.isReferring = true;
      })
      .addCase(referPatient.fulfilled, (state, action) => {
        state.isReferring = false;
        state.isReferringSuccess = true;
        // reset to empty and push
        state.singleReferral = [];
        state.singleReferral.push(action.payload);
      })
      .addCase(referPatient.rejected, (state, action) => {
        state.isReferring = false;
        state.isReferringError = true;
        state.referringMessage = action.payload;
      })

      .addCase(updateReferral.pending, (state) => {
        state.isUpdatingReferral = true;
      })
      .addCase(updateReferral.fulfilled, (state, action) => {
        state.isUpdatingReferral = false;
        state.isUpdatingReferralSuccess = true;
        // reset to empty and push
        state.singleReferral = [];
        state.singleReferral.push(action.payload);
      })
      .addCase(updateReferral.rejected, (state, action) => {
        state.isUpdatingReferral = false;
        state.isUpdatingReferralError = true;
        state.isUpdatingReferralMessage = action.payload;
      })
      .addCase(getReferrals.pending, (state) => {
        state.isLoadingReferrals = true;
      })
      .addCase(getReferrals.fulfilled, (state, action) => {
        state.isLoadingReferralsError = false;
        state.isLoadingReferrals = false;
        state.isLoadingReferralsSuccess = true;
        // reset to empty and push
        state.referrals = [];
        state.referrals.push(...action.payload);
      })
      .addCase(getReferrals.rejected, (state, action) => {
        state.isLoadingReferrals = false;
        state.isLoadingReferralsError = true;
        state.isLoadingReferralsMessage = action.payload;
        state.referrals = [];
      });
  },
});

export const {
  resetLoadingCliniciansError,
  resetClinician,
  resetLoadReferralError,
} = referralSlice.actions;
export default referralSlice.reducer;
