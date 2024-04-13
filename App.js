import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider, useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// screens
import TaskListScreen from './src/screens/TaskListScreen';
import TaskDetailsScreen from './src/screens/TaskDetailScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import EditTaskScreen from './src/screens/EditTaskScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import {setAuthState} from './src/store/slice/authSlice';

const Stack = createNativeStackNavigator();

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userEmail = await AsyncStorage.getItem('email');
      dispatch(setAuthState(!!userEmail));
    };

    checkLoginStatus();
  }, [dispatch]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Tasks" component={TaskListScreen} />
            <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
            <Stack.Screen name="AddTask" component={AddTaskScreen} />
            <Stack.Screen name="EditTask" component={EditTaskScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
