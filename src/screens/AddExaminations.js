import { View, Text, TextInput, TouchableNativeFeedback, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button'
import axios from 'axios'
import { createNewExamEndpoint } from '../api/api'
import DateTimePicker from '@react-native-community/datetimepicker'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DefaultLoader from '../components/DefaultLoader'
import { useSelector } from 'react-redux'

export default function AddExaminationsModal({ visible, onClose, classId,appendToData }) {
    const userData = useSelector(state => state?.Auth?.userData)
  const [loading, setLoading] = useState(false)
  const [subject, setSubject] = useState('')
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShowDatePicker(false)
    setDate(currentDate)
  }

  const createNewExam = async () => {
    setLoading(true)
    try {
      const response = await axios.post(createNewExamEndpoint, {
        classId: classId,
        subject: subject,
        date: date.toLocaleDateString(),
        type: (userData.type === 'teacher') ? 'Class Test' : 'Exam'
      })

      if (response.status === 200) {
        appendToData({
          subject: subject,
          date: date.toLocaleDateString(),
        })
        setSubject('')
        onClose()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      onClose()
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
      {(loading)? <DefaultLoader />:<View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>
          <InputField label="Subject" onChangeText={setSubject} value={subject} />
          <TouchableNativeFeedback onPress={() => setShowDatePicker(true)}>
            <View style={styles.dateInput}>
              <Text style={styles.dateInputText}>{date.toLocaleDateString()}</Text>
              <Ionicons name="calendar-outline" size={24} color="black" />
            </View>
          </TouchableNativeFeedback>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
          <Button title="Add Exam" onPress={createNewExam} />
        </View>}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
    width: '100%',
  },
  dateInputText: {
    fontSize: 16,
  },
})
