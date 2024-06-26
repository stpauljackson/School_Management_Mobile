import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import { fetchEventsEndpoint } from '../api/api';
import AddAnnoucements from '../components/AddAnnoucements';
import Loader from '../components/Loader';
export default function Announcements({navigation}) {
  const userData = useSelector(state => state?.Auth?.userData);
  const schoolId = userData.schoolId;
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([]);
  const [scroll, setScroll] = useState(null);

  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible(!visible);

  const fetchAnnouncements = async () => {
    setLoading(true);
    const payload = {
      school: schoolId,
    };
    console.log(payload);
    try {
      const response = await axios.post(
        fetchEventsEndpoint,
        payload,
      );
      setMessages(response.data.sort((a, b) => new Date(b.currentDate) - new Date(a.currentDate)));

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
    if (schoolId) {
      fetchAnnouncements();
    }
  }, [schoolId]);

  useEffect(() => {
    if(scroll){
      scroll.scrollToOffset({animated: true, offset: 0});
    }
  }, [messages]);

  if (loading) return <Loader />

  return (
    <View style={{flex:1}}>
      <FlatList
        ref={ref => setScroll(ref)}
        data={messages}
        keyExtractor={item => item.title}
        renderItem={({item}) => <Message item={item} navigation={navigation} />}
        numColumns={1}
      />
      <AddAnnoucements visible={visible} toggle={toggle} schoolId={userData.schoolId} setMessages={setMessages}/>
      {userData.type === 'admin' &&
      <TouchableNativeFeedback onPress={()=>{toggle()}}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Add Annoucement</Text>
        </View>
      </TouchableNativeFeedback>
    }
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
  },
  button: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'royalblue',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
