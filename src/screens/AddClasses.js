import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {getStudentFromClassEndpoint} from '../api/api';
import AddStudentModal from '../components/AddStudentModal';
export default function AddClasses({route}) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible(!visible);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(getStudentFromClassEndpoint, {
        classId: route.params.id,
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStudent = ({item}) => <Text>{item.name}</Text>;

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {students.length === 0 ? (
        <Text>No students</Text>
      ) : (
        <FlatList
          data={students}
          renderItem={renderStudent}
          keyExtractor={item => item.id.toString()}
        />
      )}
      <AddStudentModal visible={visible} toggle={toggle} classId={route.params.id} />
      
      <TouchableNativeFeedback onPress={toggle}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Add Student</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
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
