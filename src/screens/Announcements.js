import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import { fetchEventsEndpoint } from '../api/api';
import Loader from '../components/Loader';
export default function Announcements({navigation}) {
  const userData = useSelector(state => state?.Auth?.userData);
  const school = userData.school;
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([]);
  const fetchAnnouncements = async () => {
    setLoading(true);
    const payload = {
      school: school,
    };
    console.log(payload);
    try {
      const response = await axios.post(
        fetchEventsEndpoint,
        payload,
      );
      console.log(response.data);
      setMessages(response.data);
      return;
    } catch (error) {
      console.error('Error fetching class:', error);
      throw error;
    }
    finally{
        setLoading(false)
    }
  };
  useEffect(() => {
    if (school) {
      fetchAnnouncements();
    }
  }, [school]);

  if (loading) return <Loader />

  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={item => item.title}
        renderItem={({item}) => <Message item={item} navigation={navigation} />}
        numColumns={1}
      />
    </View>
  );
}
const Message = ({item, navigation}) => {
  return (
    <TouchableNativeFeedback>
      <View style={styles.cardContainer}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'royalblue',
    paddingVertical:5,
    paddingHorizontal:10
  },
  message: {
    paddingVertical:5,
    paddingHorizontal:10,
    color:'black'
  }
});
