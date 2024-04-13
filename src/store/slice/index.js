import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taskReducer from './taskSlice';
const rootReducer = combineReducers({
    auth: authReducer,
  tasks: taskReducer,
});

export default rootReducer;
