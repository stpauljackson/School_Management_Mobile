import { View, Text,StyleSheet,Modal,TextInput } from 'react-native'
import React,{useState} from 'react'
import Button from './Button';
import Loader from './Loader';
import axios from 'axios';
import {createAnnouncementsEndpoint} from '../api/api'
export default function AddAnnoucements({visible, toggle,schoolId}) {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [title, setTitle] = useState('')

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const payload = {
                title: title,
                message: message,
                school: schoolId,
            }
            const config = {
                headers: {'Content-Type': 'application/json'}
            }
            const res = await axios.post(createAnnouncementsEndpoint, payload, config)
            setLoading(false)
            toggle()
        } catch (error) {
            console.error('Error creating announcement:', error);
            setLoading(false)
        }
    }

    if (loading) return <Loader />

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={toggle}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            value={title}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.input, {height: 80, textAlignVertical: 'top'}]}
            multiline={true}
            onChangeText={setMessage}
            value={message}
          />
        </View>
        <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    form: {
      marginBottom: 20,
      width: '100%',
    },
    label: {
      position: 'absolute',
      top: -10,
      left: 10,
      backgroundColor: '#fff',
      paddingHorizontal: 5,
      zIndex: 1,
      color:'gray'
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        color:'black'
      },
    fileName: {
      marginTop: 10,
      marginBottom: 20,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
      margin: 20,
      width: '90%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
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
  