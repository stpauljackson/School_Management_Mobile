import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useSelector} from 'react-redux';
import axios from 'axios';
import {getAllStudentsEndpoint} from '../api/api';
import ContactCard from '../components/ContactCard';
import Loader from '../components/Loader';
export default function ContactList({navigation}) {
  const userData = useSelector(state => state?.Auth?.userData);
  const user = useSelector(state => state.Auth.user);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchStudents = async () => {
    const payload = {
      Type: 'student',
      Class: userData.classId,
      purpose: 'Contacts',
    };
    try {
      const response = await axios.post(getAllStudentsEndpoint, payload);
      if (response?.data?.errorMessage) {
        setError(response.data.errorMessage);
        return;
      }
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableNativeFeedback onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color="black" />
        </TouchableNativeFeedback>

        <Text style={styles.text}>Contacts</Text>
        <TouchableNativeFeedback>
          <Ionicons name="search" size={25} color="black" />
        </TouchableNativeFeedback>
      </View>
      <FlatList
        data={students}
        keyExtractor={item => item.uid}
        renderItem={({item}) => (
          <ContactCard item={item} navigation={navigation} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'start',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
