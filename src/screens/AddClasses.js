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
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AddClasses({navigation,route}) {
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

  const renderStudent = ({item,index}) => (
    <TouchableNativeFeedback onPress={() => {navigation.navigate('Student Details',{studentInfo:item})}}>
    <View style={styles.cardContainer}>
      <Text style={{fontWeight:'bold',fontSize:20}}>{index+1}. {item.firstName} {item.lastName}</Text> 
      <Ionicons name="chevron-forward" size={25} color="gray" />
    </View>
    </TouchableNativeFeedback>
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={{flex: 1, justifyContent: 'center',alignItems:'center'}}>
      {students.length === 0 ? (
        <Text>No students</Text>
      ) : (
        <View style={{flex: 1,justifyContent:'center',width:"100%"}}>
        <FlatList
          data={students}
          renderItem={renderStudent}
          keyExtractor={item => item.id.toString()}
        />
        </View>
      )}
      <AddStudentModal
        visible={visible}
        toggle={toggle}
        classId={route.params.id}
      />

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
  cardContainer: {
    flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
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
});
