import { View, Text, StyleSheet, Image,FlatList, TouchableNativeFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import examIcon from '../Assets/exam-card.png';
import axios from 'axios';
import {getExamsByClassIdEndpoint} from '../api/api';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../components/Loader';
import AddExaminationsModal from '../screens/AddExaminations';
export default function Examination({navigation,route}) {
const [exams, setExams] = useState([]);
const [isLoading,setIsLoading] = useState(false);
const userData = useSelector(state => state?.Auth?.userData);
const [modalVisible, setModalVisible] = useState(false);

const appendToData = (newItem) => {
    setExams((prevData) => [...prevData, newItem]);
  };
const fetchExams = async () => {
    setIsLoading(true);
    try {
        let classId =  route?.params?.id || userData?.classId
      const response = await axios.post(getExamsByClassIdEndpoint, 
        {classId}
      );
      console.log(response)
      setExams(response.data);
    } catch (error) {
        if(error.response.status === 404){
            setExams([])
        }
      console.error('Error fetching exams:', error);
      throw error;
    }
    finally{
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchExams();
  }, []);

if(isLoading){
    return (<Loader/>)
}
if(exams.length === 0){
    return (<View style={{backgroundColor:'white',height:'100%',justifyContent:'center',alignItems:'center'}}>
        <Text>No Exams Found</Text>
        <TouchableNativeFeedback  onPress={()=>setModalVisible(true)}>
            <View style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
            </View>
          </TouchableNativeFeedback>
          <AddExaminationsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        classId={route.params?.id}
        appendToData={appendToData}
      />
        </View>
    )
}
  return (
    <View>
        <View style={{backgroundColor:'white',height:'100%',marginBottom:10}}>
          <FlatList
            data={exams}
            keyExtractor={item => item?.subject+item?.date}
            renderItem={({ item, index }) => (
            <TouchableNativeFeedback onPress={()=> 
            {
                if(type === 'teacher'){
                    navigation.navigate('Examinations',{id:item?.id})
                }
                if(type === 'student'){

                }
            }
        }>
              <View style={{ marginBottom: 10, backgroundColor: '#fff', borderRadius: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, padding: 10, borderWidth: 1, borderColor: '#ddd',justifyContent: 'center', alignItems: 'center' }}>
                <Image source={examIcon} style={{ width: 50, height: 50 }} />
                <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ fontSize: 20, color: 'royalblue', fontWeight: 'bold' }}> {item?.subject}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons
                        name={'calendar-outline'}
                        size={18}
                        color="#333"
                        />
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}> {item?.date}</Text></View>
                  </View>
                </View>
              </View>
              </TouchableNativeFeedback>
            )}
          />
          <TouchableNativeFeedback onPress={()=>setModalVisible(true)}>
          <View style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <AddExaminationsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
        route={route}
        classId={route.params?.id}
        appendToData={appendToData}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: 'royalblue',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 30,
        bottom: 30,
        zIndex: 5,
      },
      addButtonText: {
        color: '#fff',
        fontSize: 32,
        lineHeight: 32,
      },
})