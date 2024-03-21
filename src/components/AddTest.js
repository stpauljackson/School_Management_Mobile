import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TextInput,
} from 'react-native';
import Button from './Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from './Loader';

export default AddTest = ({
  modalVisible,
  setModalVisible,
  onPress,
  loading,
}) => {
  const [testName, setTestName] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          {loading ? (
            <Loader />
          ) : (
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add New Test</Text>
              <View style={styles.form}>
                <Text style={styles.label}>Test Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder=""
                  value={testName}
                  onChangeText={setTestName}
                />
              </View>
              <View style={styles.form}>
                <Text style={styles.label}>Subject</Text>
                <TextInput
                  style={styles.input}
                  placeholder=" "
                  value={subject}
                  onChangeText={setSubject}
                />
              </View>
              <View style={styles.form}>
                <Text style={styles.label}>Date</Text>
                <View style={styles.dateInput}>
                  <TextInput
                    style={{}}
                    placeholder="Select Date"
                    value={date.toDateString()}
                    editable={false}
                  />
                  <TouchableNativeFeedback
                    style={{height: '100%', width: '100%'}}
                    onPress={() => setShowDatePicker(true)}>
                    <Ionicons name="calendar" size={24} color="gray" />
                  </TouchableNativeFeedback>
                </View>
                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </View>
              <View style={styles.Buttons}>
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                <Button
                  title="Add"
                  onPress={() => onPress(testName, subject, date)}
                />
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    zIndex: 1,
  },
  Buttons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalView: {
    margin: 20,
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
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    color: 'royalblue',
  },
});
