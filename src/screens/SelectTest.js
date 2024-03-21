import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import AddTest from '../components/AddTest';
import { createNewTestEndpoint, getAllTestsEndpoint } from '../api/api';
import Loader from '../components/Loader';

export default function SelectTest({navigation,route}) {
const {classId} = route.params
const user = useSelector(state => state?.Auth?.user)
const [tests,setTests] = useState([])
const [loading,setLoading] = useState(false)
const [modalVisible, setModalVisible] = useState(false);
const fetchTest = async () => {
    setLoading(true)
    const payload = {
        classId: classId,
        teacherId: user
    };
   console.log(payload)
    try {
      const response = await axios.post(
        getAllTestsEndpoint,
        payload,
      );
    console.log(response.data);
      setTests(response.data)
      return 
    } catch (error) {
      console.error('Error fetching class:', error);
      throw error;
    }
    finally{
        setLoading(false)
    }
  };
const addTest = async (testName,subject,date) => {
    setLoading(true)
    const payload = {
        classId: classId,
        teacherId: user,
        testName: testName,
        subject: subject,
        date: date
    };
   console.log(payload)
    try {
      const response = await axios.post(
        createNewTestEndpoint,
        payload,
      );
      fetchTest()

      setModalVisible(false)
      setLoading(false)
      return 
    } catch (error) {
        setModalVisible(false)
        setLoading(false)
      console.error('Error fetching class:', error);
      throw error;
    }
}
useEffect(()=>{
    if(classId && user) {
        fetchTest();
    }
},[classId,user])
if(loading && !modalVisible) return <Loader /> 
  return (
    <View style={{flex: 1, paddingBottom: 40}}>
    <FlatList
      data={tests}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <Tests
          item={item}
          navigation={navigation}
        />
      )}
      numColumns={2} 
    />
    <AddTest loading={loading} onPress={addTest} modalVisible={modalVisible} setModalVisible={setModalVisible} />
    <TouchableNativeFeedback onPress={()=>setModalVisible(true)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Add New Test</Text>
        </View>
      </TouchableNativeFeedback>
  </View>
  )
}
const Tests = ({item,navigation}) => {
    return (
      <TouchableNativeFeedback onPress={()=>{navigation.navigate('Add Marks')}} >
        <View style={styles.cardContainer}>
          <Text style={styles.name}>{item.testName}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  const styles = StyleSheet.create({
    cardContainer: {
    flex: 1,
      flexDirection: 'row',
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
    }
  });