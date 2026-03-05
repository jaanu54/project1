import React from 'react';
import { useTasks } from '../context/TaskContext'; // Use context
import { useNavigate } from 'react-router-dom'; // For dynamic routing

const TaskItem = ({ task }) => { // Props: task object
  const { dispatch } = useTasks(); // Context dispatch
  const navigate = useNavigate();

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_TASK', payload: { ...task, completed: !task.completed } });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: task.id });
  };

  const handleEdit = () => {
    navigate(`/edit-task/${task.id}`); // Dynamic route
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.body || 'No description'}</p>
      <button onClick={handleToggle}>
        {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete} style={{ background: '#dc3545' }}>Delete</button>
    </div>
  );
};

export default TaskItem;