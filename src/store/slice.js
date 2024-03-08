import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const fetchUserData = createAsyncThunk(
    'userData/fetch',
    async (userId, { dispatch, getState }) => {
      try {
        const userDocument = await firestore()
          .collection('users')
          .doc(userId)
          .get();
  
        if (userDocument.exists) {
          const userData = userDocument.data();
          dispatch(setUserData(userData));
        } else {
          console.error('Document does not exist');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    }
  );

const slice = createSlice({
  name: 'auth',
  initialState:{
    user:null,
    userData:null,
  },
  reducers: {
    setUser: (state,action) => {
        return {...state, user:action.payload};
    },
    setUserData: (state,action) => {
        return { ...state, userData: action.payload };
    },
  },
});

export const { setUser, setUserData } = slice.actions;
export default slice.reducer;
