import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {deleteTask} from '../store/slice/taskSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../store/slice/authSlice';

const TaskListScreen = ({navigation}) => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleLogout = async () => {
    try {
        dispatch(logout());
       
    } catch (e) {
      Alert.alert('Logout Error', 'Failed to log out.');
    }
  };

  const handleAddTask = () => {
    navigation.navigate('AddTask');
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('TaskDetails', {taskId: item.id})}>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => dispatch(deleteTask(item.id))}>
        <Icon name="delete" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No tasks available. Add a new task!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={renderEmptyComponent}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  headerButton: {
    marginRight: 10,
  },
  headerButtonText: {
    color: '#007AFF', 
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  item: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#FF6347', 
    borderRadius: 20,
  },
  addButton: {
    backgroundColor: '#007AFF', 
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
  },
});

export default TaskListScreen;
