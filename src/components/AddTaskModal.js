import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Button from './Button';
const AddTaskModal = ({ onSave, onCancel }) => {
  const [task, setTask] = useState('');

  const handleSave = () => {
    if (task.trim()) {
      onSave(task);
      setTask('');
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={task}
          onChangeText={setTask}
        />
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={onCancel} />
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddTaskModal;
