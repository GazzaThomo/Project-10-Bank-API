//here we create a seperate slice for profile fetching and updating

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// token is already created in other state in the auth slice
const initialState = {
  loading: false,
  profile: null,
  error: null,
};

const baseUrl = "http://localhost:3001/api/v1";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  //use underscore because no parameters
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    //get toekn from other initialstate
    const token = state.auth.userToken;
    try {
      const config = {
        headers: {
          //remember the Bearer here
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${baseUrl}/user/profile`, {}, config);
      return response.data.body;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ firstName, lastName }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.userToken;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.put(
        `${baseUrl}/user/profile`,
        { firstName, lastName },
        config
      );
      return response.data.body;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profile = payload;
      })
      .addCase(fetchProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profile = payload;
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default profileSlice.reducer;
