import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Button from '../components/Button';
import {uploadFileEndpoint} from '../api/api'
import axios from 'axios';
export default Assignments = () => {
  const [selectedFile, setSelectedFile] = useState();


  const handleFileSelection = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        multiple: false,
      });
      setSelectedFile(res);
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
      // formData.append('userId', userId); // TODO add more payload here
      
      const response = await axios.post(uploadFileEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select File" onPress={handleFileSelection} />
      {selectedFile && (
        <>
          <Text style={styles.fileName}>Selected File: {selectedFile[0].name}</Text>
          <Button title="Upload" onPress={handleUpload} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileName: {
    marginTop: 10,
    marginBottom: 20,
  },
});


