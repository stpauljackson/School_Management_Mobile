import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getClassEndpoint } from '../api/api';

export const fetchClass = createAsyncThunk(
    'class/fetchClass', 
    async ({ user }, { dispatch, rejectWithValue }) => (
        axios.post(getClassEndpoint, { uid: user })
            .then(response => {
                dispatch(setClasses(response.data))
                return response.data
            })
            .catch(rejectWithValue)
    )
);

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
