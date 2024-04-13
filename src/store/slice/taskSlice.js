import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      console.log("🚀 ~ action:", action)
      
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      state.tasks[index] = {...state.tasks[index], ...action.payload};
    },
  },
  
});

export const { addTask, deleteTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;
