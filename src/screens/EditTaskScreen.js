import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask } from '../store/slice/taskSlice';

const EditTaskScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const task = useSelector(state => state.tasks.tasks.find(t => t.id === taskId));
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({ title: 'Edit Task' });
  }, [navigation]);

  const handleUpdateTask = () => {
    if (title.trim() && description.trim()) {
      dispatch(updateTask({ id: taskId, title, description }));
      navigation.goBack();
    } else {
      alert('Both fields are required.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.multilineInput]}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateTask}>
        <Text style={styles.buttonText}>Update Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f4f4f4', 
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: 'white', 
  },
  multilineInput: {
    minHeight: 100, 
    textAlignVertical: 'top', 
  },
  button: {
    backgroundColor: '#007bff', 
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default EditTaskScreen;
