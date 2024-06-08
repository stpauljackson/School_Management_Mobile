import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native'
import React from 'react'

import announcementImg from '../Assets/announcement.png';
import uploadMarksImg from '../Assets/upload.png';
import attendanceImg from '../Assets/attendance.png';
import calendarImg from '../Assets/calendar.png';
import examImg from '../Assets/Exam.png';
import resultsImg from '../Assets/Results.png';
import timetableImg from '../Assets/TimeTable.png';
import assignmentsImg from '../Assets/assignment.png';
import Profile from '../Assets/Profile.png';
import Dashboard from '../Assets/Dashboard.png';
import student from '../Assets/student.png';
import teacher from '../Assets/teacher.png';
import employee from '../Assets/employee.png';
const icons = {
    'Take Attendance': attendanceImg,
    'Upload Marks': uploadMarksImg,
    'Calendar': calendarImg,
    'Assignments': assignmentsImg,
    'Announcements': announcementImg,
    'TimeTable': timetableImg,
    'Results': resultsImg,
    'Examinations': examImg,
    'My Details': Profile,
    "Dashboard": Dashboard,
    "Students":student,
    "Teachers":teacher,
    "Employees":employee
}

export default function Card({item,navigation}) {
    
    return (
        <TouchableOpacity 
        onPress={()=>navigation.navigate(item.key,item?.params)} 
        style={styles.cardContainer}>
            <Image style={styles.img} source={icons[item.name]} />
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
        elevation: 3,
      },
      cardText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 10,
      },
    });