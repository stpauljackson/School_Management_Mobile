import { View, Text } from 'react-native'
import React,{useState, useEffect} from 'react'
import { FlatList,TouchableNativeFeedback } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function ChatHistory({navigation}) {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchChatList = async () => {
      const chatList = await AsyncStorage.getItem('chatList');
      if (chatList) {
        setChatList(JSON.parse(chatList));
      } else {
        setChatList([]);
      }
    };
    fetchChatList();
  }, []);

  const chatListContacts = chatList.map((item) => item)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
       <TouchableNativeFeedback onPress={()=>navigation.toggleDrawer()}><Ionicons name="menu" size={25} color="black" /></TouchableNativeFeedback> 
      
      <Text style={styles.text}>Messages</Text>
      <TouchableNativeFeedback onPress={()=>navigation.navigate('Notifications')}>
        <Ionicons name="notifications" size={25} color="black" />
      </TouchableNativeFeedback>
    </View>
      <FlatList
        data={chatListContacts}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        keyExtractor={(item) => item}
      />
      <TouchableNativeFeedback 
      onPress={() => navigation.navigate('Contacts')}
      >
        <View style={styles.fab}>
          <Ionicons name="add" size={25} color="white" />
        </View>
      </TouchableNativeFeedback>

    </View>
  )
}

const styles = {
  fab: {
    position: 'absolute',
    bottom: 10,
    right: '50%',
    transform: [{translateX: 25}],
    backgroundColor: 'royalblue',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  flatList: {
    width: '100%',
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f9c2ff',
    borderRadius: 10,
  },
};
