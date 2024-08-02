import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getClassEndpoint } from '../api/api';


export const apiCallsSlice = createSlice({
  name: 'apiCalls',
  initialState: {
    Classes: [],
    loading: 'idle',
    error: null,
  },
  reducers: {
    setTodoData: (state, action) => {
      state.data = action.payload;
    },
    setTodoLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTodoError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTodoData, setTodoLoading, setTodoError } = apiCallsSlice.actions;

export default apiCallsSlice.reducer;
