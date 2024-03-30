import React, {useEffect, useState} from 'react';
import {Modal, View, Text, StyleSheet, TextInput} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Button from '../components/Button';
import {uploadFileEndpoint} from '../api/api';
import axios from 'axios';
import {useSelector} from 'react-redux';

export default UploadAssignmentModal = ({visible, toggle, classId}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [assignmentName, setAssignmentName] = useState('');
  const teacherId = useSelector(state => state.Auth.user);
  const handleFileSelection = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        multiple: false,
      });
      setSelectedFile(res[0]);
    } catch (err) {
      console.log('Document picker error:', err);
    }
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.log('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile.uri,
        type: selectedFile.type,
        name: selectedFile.name,
      });
      formData.append('teacherId', teacherId);
      formData.append('classId', classId);
      formData.append('assignmentName', assignmentName);

      const response = await axios.post(uploadFileEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
      toggle();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  useEffect(() => {
    console.log(selectedFile)
  })
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={toggle}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <View style={styles.form}>
          <Text style={styles.label}>Assignment Name</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            onChangeText={setAssignmentName}
            value={assignmentName}
          />
        </View>
          <Button title="Select File" onPress={handleFileSelection} />
          {selectedFile && (
            <>
              <Text style={styles.fileName}>
                Selected File: {selectedFile.name}
              </Text>
              <Button title="Upload" onPress={handleUpload} />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

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
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
