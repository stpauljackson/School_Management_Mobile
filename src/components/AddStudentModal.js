import {View, Text, FlatList, Modal, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {createUserIdsWithExcelFileEndpoint} from '../api/api';
import {useSelector} from 'react-redux';
import InputField from './InputField';
import Button from './Button';
import Loader from './Loader';
import axios from 'axios';
const fields = [
  {label: 'Email', state: 'email', keyboardType: 'email-address'},
  {label: 'First Name', state: 'firstName'},
  {label: 'Last Name', state: 'lastName'},
  {label: 'Gender', state: 'gender'},
  {label: 'Phone Number', state: 'phoneNumber', keyboardType: 'phone-pad'},
  {label: 'Address', state: 'address'},
  {label: 'Date of Birth', state: 'dateOfBirth'},
  {label: 'Father Name', state: 'fatherName'},
  {label: 'Father Occupation', state: 'fatherOccupation'},
  {
    label: 'Father National ID',
    state: 'fatherNationalId',
    keyboardType: 'numeric',
  },
  {
    label: 'Father Mobile Number',
    state: 'fatherMobileNumber',
    keyboardType: 'phone-pad',
  },
  {label: 'Father Income', state: 'fatherIncome', keyboardType: 'numeric'},
  {label: 'Father Education', state: 'fatherEducation'},
  {label: 'Mother Name', state: 'motherName'},
  {label: 'Mother Occupation', state: 'motherOccupation'},
  {
    label: 'Mother National ID',
    state: 'motherNationalId',
    keyboardType: 'numeric',
  },
  {label: 'Mother Education', state: 'motherEducation'},
  {label: 'Mother Income', state: 'motherIncome', keyboardType: 'numeric'},
  {
    label: 'Mother Mobile Number',
    state: 'motherMobileNumber',
    keyboardType: 'phone-pad',
  },
  {
    label: 'Student Govt ID No.',
    state: 'studentGovtIdNo',
    keyboardType: 'numeric',
  },
  {label: 'Orphan', state: 'orphan', keyboardType: 'numeric'},
  {label: 'Religion', state: 'religion'},
  {label: 'Identification Mark', state: 'identificationMark'},
  {label: 'Previous School', state: 'previousSchool'},
  {label: 'Blood Group', state: 'bloodGroup'},
  {label: 'Board Roll No.', state: 'boardRollNo', keyboardType: 'numeric'},
  {label: 'Total Siblings', state: 'totalSiblings', keyboardType: 'numeric'},
];
export default function AddStudentModal({visible, toggle, classId}) {
  const userData = useSelector(state => state?.Auth?.userData);
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({});
    setSource(null);
  }, [visible]);

  const handleInputChange = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };
  const handleFileSelection = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
        ],
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

      formData.append('classId', classId);
      formData.append('schoolId',userData?.schoolId);
      formData.append('type', 'student');

      const response = await axios.post(
        createUserIdsWithExcelFileEndpoint,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('File uploaded successfully:', response.data);
      toggle();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const renderItem = ({item}) => (
    <InputField
      label={item.label}
      value={formData[item.state] || ''}
      onChangeText={text => handleInputChange(item.state, text)}
      keyboardType={item.keyboardType || 'default'}
    />
  );

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={toggle}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {loading ? <Loader />:
            <>
            {source === null && (
              <>
                <Text
                  style={{fontSize: 20, alignSelf: 'center', marginBottom: 20}}>
                  Choose your data input method:
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <Button title="Manual" onPress={() => setSource('manual')} />
                  <Button title="From File" onPress={() => setSource('file')} />
                </View>
              </>
            )}
            {source === 'manual' && (
              <>
                <Text style={styles.Header}>Student Info</Text>
                <FlatList
                  data={fields}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
                <Button title="Submit" onPress={() => {}} />
              </>
            )}
            {source === 'file' && (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
            )}
            </>
            }
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Header: {
    fontSize: 20,
    alignSelf: 'center',
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
    color: 'gray',
  },
  fileName: {
    marginTop: 10,
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    color: 'black',
  },
});
