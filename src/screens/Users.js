import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

import {getUsersByClassOrSchoolEndpoint} from '../api/api';
import AddStudentModal from '../components/AddStudentModal';
import Loader from '../components/Loader';
import UserListCard from '../components/UserListCard';

export default function Users({navigation, route}) {
  const {schoolId} = useSelector(state => state.Auth.userData);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const type = route?.params?.type;

  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible(!visible);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(getUsersByClassOrSchoolEndpoint, {
        type: type,
        schoolId,
      });
      setUsers(response.data);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (users.length === 0)
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No {type} Found</Text>
        </View>
        <AddStudentModal
        visible={visible}
        toggle={toggle}
        classId={route.params.id}
        fetchData={fetchData}
        type={type}
      />
        <TouchableNativeFeedback onPress={toggle}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add {route?.params?.title}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <UserListCard item={item} index={index} navigation={navigation} />
        )}
      />
      <AddStudentModal
        visible={visible}
        toggle={toggle}
        classId={route.params.id}
        fetchData={fetchData}
        type={type}
      />
      <TouchableNativeFeedback onPress={toggle}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Add {route?.params?.title}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'royalblue',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
