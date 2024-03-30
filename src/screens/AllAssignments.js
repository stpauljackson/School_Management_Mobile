import {
  View,
  Text,
  FlatList,
  TouchableNativeFeedback,
  StyleSheet,
  Linking
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {getAssignmentsEndpoint} from '../api/api';
import UploadAssignmentModal from './UploadAssignment';

export default function AllAssignments({navigation, route}) {
  const teacherId = useSelector(state => state.Auth.user);
  const classId = route.params.classId;
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible(!visible);
  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(getAssignmentsEndpoint, {
        classId,
        teacherId,
      });
      setAssignments(res.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  if (isLoading) return <Loader />;
  if (assignments.length === 0)
    return (
      <View
        style={{
          flex: 1,
          paddingBottom: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>No assignments</Text>
        <UploadAssignmentModal
          visible={visible}
          toggle={toggle}
          classId={classId}
        />
        <TouchableNativeFeedback onPress={() => toggle()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add Assignment</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={assignments}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.cardContainer}>
            <Text style={{marginLeft: 20}}>{item.assignmentName}</Text>
            <TouchableNativeFeedback onPress={() => Linking.openURL(item.url)}>
              <View
                style={{
                  height: '100%',
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  name="arrow-down-circle-outline"
                  size={24}
                  color="black"
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        )}
      />
      <UploadAssignmentModal
        visible={visible}
        toggle={toggle}
        classId={classId}
      />
      <TouchableNativeFeedback onPress={() => toggle()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Add Assignment</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    height: 50,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
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
