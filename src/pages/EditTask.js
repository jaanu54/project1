import React, { useState, useEffect } from 'react'; // useEffect for data load
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';

const EditTask = () => {
  const { id } = useParams(); // Dynamic route param
  const navigate = useNavigate();
  const { state, dispatch } = useTasks();
  const [initialData, setInitialData] = useState({});

  useEffect(() => { // useEffect to load initial data
    const task = state.tasks.find(t => t.id === parseInt(id));
    if (task) {
      setInitialData(task);
    } else {
      // For add mode (id undefined)
      setInitialData({});
    }
  }, [id, state.tasks]);

  const handleSubmit = (data) => {
    if (id) {
      // Simulate API PUT
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...data, completed: false }),
        headers: { 'Content-type': 'application/json' }
      }).then(() => dispatch({ type: 'UPDATE_TASK', payload: { id: parseInt(id), ...data, completed: false } }));
    } else {
      // Simulate API POST
      fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({ ...data, completed: false, userId: 1 }),
        headers: { 'Content-type': 'application/json' }
      }).then(res => res.json())
        .then(newTask => dispatch({ type: 'ADD_TASK', payload: newTask }));
    }
  };

  const handleDelete = () => {
    // Simulate API DELETE
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { method: 'DELETE' })
      .then(() => {
        dispatch({ type: 'DELETE_TASK', payload: parseInt(id) });
        navigate('/tasks');
      });
  };

  return (
    <div>
      <h2>{id ? 'Edit Task' : 'Add New Task'}</h2>
      <TaskForm onSubmit={handleSubmit} initialData={initialData} />
      {id && <button onClick={handleDelete} style={{ background: '#dc3545' }}>Delete Task</button>}
    </div>
  );
};

export default EditTask;