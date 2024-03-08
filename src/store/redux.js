import { configureStore} from '@reduxjs/toolkit';
import AuthReducer from './slice';

const store = configureStore({
  reducer: {
    Auth : AuthReducer,
  },
});

export default store;
