import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import { View,Text,TouchableNativeFeedback } from 'react-native';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';
const Drawer = createDrawerNavigator();
const CustomDrawerItem = ({ label, onPress }) => (
    <TouchableNativeFeedback onPress={onPress}>
        <View style={{ padding: 10, backgroundColor:'white' }}>
      <Text style={{ fontSize: 16 }}>{label}</Text>
      </View>
    </TouchableNativeFeedback>
  );
const CustomDrawerContent = ({ navigation }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 50}}>
        <View>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20,marginHorizontal: 10}}>School App</Text>
        <View style={{marginHorizontal: 20}}>
        <CustomDrawerItem label="Home" onPress={() => navigation.navigate('BottomTabNavigator')} />
        </View>
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <Button title="Logout" iconName={'log-out-outline'}  onPress={() => {
          auth().signOut()
            .then(() => console.log('logged out'))
            .catch(e => console.log('error logging out: ', e.message))
        }} />
        </View>
      </View>
    );
  };

const DrawerNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator drawerContent={CustomDrawerContent} screenOptions={{headerShown: false}}>
      <Drawer.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default DrawerNavigator;
