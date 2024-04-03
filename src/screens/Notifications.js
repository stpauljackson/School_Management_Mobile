import React, {useEffect, useState} from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem('notifications');
        if (storedNotifications) {
          setNotifications(JSON.parse(storedNotifications));
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);
  if (notifications.length === 0) {
    return (
      <View style={{height:'100%',alignItems:'center',justifyContent:'center'}}>
        <Text>No notifications found</Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={notifications}
        renderItem={({item}) => (
          <Card item={item}/>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Notifications;

const Card = ({item}) => {
    const date = new Date(item.date);
    const dateString = date.toLocaleString('en-us', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'long', year: 'numeric'});
    return (
        <View style={styles.card}>
            <View style={styles.icon}>
                <Ionicons name="notifications" size={25} color="royalblue" />
            </View>
            <View style={{flex:1}}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
              <Text style={styles.date}>{dateString}</Text>
            </View>
          </View>
    )
}

const styles = StyleSheet.create({
    card:{
        margin:10,
        padding:10,
        backgroundColor:'#fff',
        flexDirection:'row',
        borderRadius:10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    icon:{
        marginRight:10,
        alignItems:'center',
        justifyContent:'center',
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        color:'royalblue',
    },
    body:{
        fontSize:16,
        marginLeft:10,
        color:'gray',
    },
    date:{
        fontSize:12,
        color:'gray',
        textAlign:'right',
    }
})