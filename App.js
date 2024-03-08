import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import {fetchUserData, setUser} from './src/store/slice';
import AuthComponent from './src/auth/AuthComponent';
import Home from './src/screens/Home';
import Attendance from './src/screens/Attendance';
import UploadMarks from './src/screens/UploadMarks';
import SelectTest from './src/screens/SelectTest';
import Announcements from './src/screens/Announcements';
import AddStudentMarks from './src/screens/AddStudentMarks';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const user = useSelector(state => state.Auth.user);
  const dispatch = useDispatch();

  const onAuthStateChanged = user => {
    dispatch(setUser(user?.uid));
    dispatch(fetchUserData(user?.uid));
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  if (!user) {
    return <AuthComponent />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="Upload Marks" component={UploadMarks} />
        <Stack.Screen name="Select Test" component={SelectTest} />
        <Stack.Screen name="Announcements" component={Announcements} />
        <Stack.Screen name="Add Marks" component={AddStudentMarks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//TODO :- Correctly arrange the MainScreen.js and App.js code
