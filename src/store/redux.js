// redux.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice'; // Import your slices here

const store = configureStore({
  reducer: {
    counter: counterReducer, // Add your reducers here
  },
});

export default store;
