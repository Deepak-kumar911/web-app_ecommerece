import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/apiInterceptor';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";

// Common thunk: accepts endpoint ('/login' or '/register') and credentials
export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async ({ endpoint, data }, { rejectWithValue }) => {
    try {
      const res = await api.post(endpoint, data);
      const details = await jwtDecode(res.data.token)
      console.log("details",details);
      
      toast.success(res?.data?.message)
      return {token:res.data.token,role:details?.role,_id:details?._id};
    } catch (err) {
        toast.error(err.response?.data?.message || 'Authentication failed')
      return rejectWithValue(err.response?.data?.message || 'Authentication failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    role:localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token'))?.role : null,
    _id:localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token'))?._id : null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      state._id = null;
      localStorage.removeItem('token');
      window.location.href = "/"
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.token = action.payload?.token;
        state.role = action.payload?.role;
        state._id = action.payload?._id;
        state.loading = false;
        localStorage.setItem('token', action.payload?.token);
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
