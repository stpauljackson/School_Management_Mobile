import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import StackNavigator from './StackNavigator';
import ChatHistory from '../screens/ChatHistory';
import ChatStackNavigator from '../screens/ChatStackNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: 'lightgray',
        },
        
        tabBarActiveTintColor: 'royalblue',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'StackNavigator') {
            iconName = 'home';
          } else if (route.name === 'ChatScreen') {
            iconName = 'chatbox-ellipses';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
    })}
  >
    <Tab.Screen name="StackNavigator" component={StackNavigator} />
    <Tab.Screen name="ChatScreen" component={ChatStackNavigator} />
  </Tab.Navigator>
);

export default BottomTabNavigator;
