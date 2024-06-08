import React, {useState, useEffect} from 'react';
import {SafeAreaView,StyleSheet,StatusBar} from 'react-native'
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import NotificationSounds from 'react-native-notification-sounds';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {fetchUserData, setUser} from './src/store/slice';
import AuthComponent from './src/auth/AuthComponent';
import Loader from './src/components/Loader';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import DrawerNavigator from './src/navigation/DrawerNavigation';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const user = useSelector(state => state.Auth.user);
  const dispatch = useDispatch();

  const onAuthStateChanged = user => {
    dispatch(setUser(user?.uid));
    dispatch(fetchUserData(user?.uid));
    if (initializing) setInitializing(false);
  };
  const storeNotification = async notification => {
    try {
      const existingNotifications = await AsyncStorage.getItem('notifications');
      const notifications = existingNotifications
        ? JSON.parse(existingNotifications)
        : [];
      notifications.push(notification);
      await AsyncStorage.setItem(
        'notifications',
        JSON.stringify(notifications),
      );
    } catch (error) {
      console.error('Error storing notification:', error);
    }
  };
  const DisplayNotification = async ({title, body}) => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();
    const soundsList = await NotificationSounds.getNotifications(
      'notification',
    );
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
  };

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
      });
    });

    return unsubscribe;
  }, []);

  if (initializing) return <Loader />;

  if (!user) return <AuthComponent />;
  return (
    <SafeAreaView style={styles.container}>
    <DrawerNavigator />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex:1,
      marginTop: StatusBar.currentHeight,
    }
})