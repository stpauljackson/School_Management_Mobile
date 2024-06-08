import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

import announcementImg from '../Assets/Announcements.jpg';
import uploadMarksImg from '../Assets/Upload.jpg';
import attendanceImg from '../Assets/Attendance.jpg';
import calendarImg from '../Assets/Calendar.jpg';
import examImg from '../Assets/Exam.jpg';
import resultsImg from '../Assets/Results.jpg';
import timetableImg from '../Assets/TimeTable.jpg';
import assignmentsImg from '../Assets/Assignments.jpg';

const icons = {
    'Attendance': attendanceImg,
    'Upload Marks': uploadMarksImg,
    'Calendar': calendarImg,
    'Assignments': assignmentsImg,
    'Announcements': announcementImg,
    'TimeTable': timetableImg,
    'Results': resultsImg,
    'Examinations': examImg
}

export default function Card({item,navigation}) {
    
    return (
        <TouchableOpacity 
        onPress={()=>navigation.navigate(item.key,item?.params)} 
        style={styles.cardContainer}>
            <Image style={styles.img} source={icons[item.key]} />
          <Text style={styles.cardText}>{item.name}</Text>
        </TouchableOpacity>
      );
    }
    
    const styles = StyleSheet.create({
        img:{
            height:50,
            width:50
        },
      cardContainer: {
        flex: 1,
        margin: 10,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      cardText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
      },
    });