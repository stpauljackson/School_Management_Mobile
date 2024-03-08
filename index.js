/**
 * @format
 */

import { AppRegistry, StatusBar  } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import { enableScreens } from 'react-native-screens';
enableScreens();

import store from './src/store/redux';

const WrappedApp = () => (
  <Provider store={store}>
    <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => WrappedApp);