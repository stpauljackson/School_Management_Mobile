import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Provider} from 'react-redux';
import store from './src/store/redux';
import AuthComponent from './src/auth/AuthComponent';
import Home from './src/screens/Home';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    if (initializing) setInitializing(false);
  }

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
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
