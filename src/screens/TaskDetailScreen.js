import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../store/slice/taskSlice';

const TaskDetailsScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const task = useSelector(state => state.tasks.tasks.find(t => t.id === taskId));
  const dispatch = useDispatch();

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Task not found.</Text>
      </View>
    );
  }

  const handleDelete = () => {
    dispatch(deleteTask(taskId));
    navigation.goBack();
  };

  const handleEdit = () => {
    navigation.navigate('EditTask', { taskId: task.id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEdit}>
            <Icon name="pencil" size={20} color="white" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
            <Icon name="delete" size={20} color="white" />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    width: '90%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  notFound: {
    fontSize: 18,
    color: 'red',
  }
});

export default TaskDetailsScreen;
