import React, { createContext, useContext, useReducer, useEffect } from 'react'; // Hooks: useReducer, useEffect

const TaskContext = createContext();

const initialState = { tasks: [] };

const taskReducer = (state, action) => { // useReducer for state management
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, { id: Date.now(), ...action.payload, completed: false }] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
      };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState); // useReducer

  useEffect(() => { // useEffect for API fetch
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5') // Mock API
      .then(res => res.json())
      .then(data => {
        const tasks = data.map(item => ({ id: item.id, title: item.title, body: 'Sample description', completed: item.completed }));
        dispatch({ type: 'SET_TASKS', payload: tasks });
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext); // Custom hook for context

