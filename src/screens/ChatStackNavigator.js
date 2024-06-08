import { createStackNavigator } from '@react-navigation/stack';
import ChatHistory from './ChatHistory';
import Contacts from './Contacts'
import Chat from '../components/Chat';

const Stack = createStackNavigator();

export default function ChatStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="ChatHistory">
      <Stack.Screen name="ChatHistory" component={ChatHistory} options={{headerShown: false}} />
      <Stack.Screen name="Contacts" component={Contacts} options={{headerShown: false}} />
      <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

