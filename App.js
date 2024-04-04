import React, {useState, useEffect} from 'react';
import {Alert, Platform,Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import NotificationSounds from 'react-native-notification-sounds';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import Notifications from './src/screens/Notifications';
import AllClasses from './src/screens/AllClasses';
import AddClasses from './src/screens/AddClasses';
import StudentDetails from './src/screens/StudentDetails';
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const user = useSelector(state => state.Auth.user);
  const dispatch = useDispatch();

  const onAuthStateChanged = user => {
    dispatch(setUser(user?.uid));
    dispatch(fetchUserData(user?.uid));
    if (initializing) setInitializing(false);
  };
  const storeNotification = async (notification) => {
    try {
        const existingNotifications = await AsyncStorage.getItem('notifications');
        const notifications = existingNotifications ? JSON.parse(existingNotifications) : [];
        notifications.push(notification);
        await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
    } catch (error) {
        console.error('Error storing notification:', error);
    }
};
  const DisplayNotification = async ({title,body}) => {

    // Request permissions (required for iOS)
    await notifee.requestPermission()
    const soundsList = await NotificationSounds.getNotifications('notification');
    console.log('length', soundsList.length);
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: soundsList[0].url,
    });

    // Display a notification
    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId, 
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };

    requestUserPermission();
    const getDeviceToken = async () => {
      const token = await messaging().getToken();
      console.log('Device Token:', token);
    };

    getDeviceToken();

    const unsubscribe = messaging().onMessage(async remoteMessage => {

    await DisplayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
    });
    await storeNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      date: new Date(),
    })
    });

    return unsubscribe;
  }, []);

  if (initializing) return <Loader />;

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
        <Stack.Screen name="All Classes" component={AllClasses} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="Assignments" component={Assignments} />
        <Stack.Screen
          name="All Assignments"
          component={AllAssignments}
          options={({route}) => ({
            headerTitle: route.params?.headerTitle || 'All Assignments',
          })}
        />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen 
        name="Add Classes" 
        component={AddClasses}
        options={({route}) => ({headerTitle: 'Class ' + route.params?.class + ' ' + route.params?.section})} />
        <Stack.Screen name="Student Details" component={StudentDetails} 
        options={({route}) => ({headerTitle: route.params?.name || 'Student Details'})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
