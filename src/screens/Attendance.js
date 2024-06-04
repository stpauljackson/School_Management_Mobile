import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import axios from 'axios';
import Loader from '../components/Loader';
import {getAllStudentsEndpoint, saveAttendanceEndpoint} from '../api/api';
import Button from '../components/Button';

const StudentList = ({item, onPress}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.cardContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text
          style={{
            color: item.attendanceStatus ? 'green' : 'red',
            ...styles.status,
          }}>
          {item.attendanceStatus ? 'Present' : 'Absent'}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default function Attendance({navigation}) {
  const userData = useSelector(state => state?.Auth?.userData);
  const user = useSelector(state => state.Auth.user);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const toggleAttendanceStatus = participantId => {
    setStudents(prevStudents =>
      prevStudents.map(student => {
        if (student.participantId === participantId) {
          return {...student, attendanceStatus: !student.attendanceStatus};
        }
        return student;
      }),
    );
  };
  const saveAttendance = async () => {
    setSaving(true);
    try {
      const payload = {
        attendanceData: students,
        teacherID: user,
      };
      const response = await axios.post(saveAttendanceEndpoint, payload);
      if (response.status === 200) {
        setSaving(false);
        navigation.goBack();
      }
      if (response.status === 403) {
        setError(response.data);
      }
      return;
    } catch (error) {
      console.error('Error Saving Attendance', error);
      setSaving(false);
      throw error;
    }
  };
  const fetchStudents = async () => {
    const payload = {
      Type: 'student',
      Class: userData.classId,
      School: userData.schoolId,
      purpose: 'attendance',
      teacherID: user,
    };
console.log("payload",payload)
    try {
      const response = await axios.post(getAllStudentsEndpoint, payload);
      console.log(response.data)
    if(response?.data?.errorMessage) 
    {
        setError(response.data.errorMessage);
        return
    }
    else
    {
        console.log('else')
    }
      const studentData = response.data.map(x => ({
        participantId: x?.uid,
        name: x.firstName +" "+ x.lastName,
        attendanceStatus: true,
      }));
      setStudents(studentData);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) fetchStudents();
  }, [userData]);
  if (loading) return <Loader />;
  if (error) {
    return (
      <View
        style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button title='Go Back' onPress={()=>navigation.goBack()}/>
        </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      {saving && <Loader />}
      <View style={{flex: 1, paddingBottom: 40}}>
        <FlatList
          data={students}
          keyExtractor={item => item.participantId}
          renderItem={({item}) => (
            <StudentList
              item={item}
              onPress={() => toggleAttendanceStatus(item.participantId)}
            />
          )}
        />
      </View>
      <TouchableNativeFeedback onPress={saveAttendance}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Save Attendance</Text>
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
  },
  status: {
    fontSize: 15,
    fontWeight: 'bold',
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
  loadingIndicator: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  errorText:{
    fontSize:20,
    color: 'black',
    marginVertical:20
  },
  errorContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
  }
});
