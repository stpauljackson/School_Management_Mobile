import React, {useState, useEffect} from 'react';
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
import Calendar from './src/screens/Calendar';
import Loader from './src/components/Loader';
import Assignments from './src/screens/Assignments';
import AllAssignments from './src/screens/AllAssignments';

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

  if (initializing) return <Loader />

  if (!user) return <AuthComponent />;
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
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="Assignments" component={Assignments} />
        <Stack.Screen name="AssignmentsList" component={AllAssignments} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
