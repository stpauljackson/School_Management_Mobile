import {View, Text, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {getAssignmentsEndpoint} from '../api/api';
import UploadAssignmentModal from './UploadAssignment';
import Button from '../components/Button';

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
        <View style={{position: 'absolute', bottom: 10}}>
          <Button title="Upload Assignment" onPress={toggle} />
        </View>
      </View>
    );
  return (
    <View>
      <FlatList
        data={assignments}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{item.assignmentName}</Text>
            <Ionicons name="md-download" size={24} color="black" />
          </View>
        )}
      />
      <UploadAssignmentModal
        visible={visible}
        toggle={toggle}
        classId={classId}
      />
    </View>
  );
}
