import React, { useState, useMemo } from 'react'; // useMemo for performance
import { useTasks } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';

const Tasks = () => {
  const { state } = useTasks();
  const [filter, setFilter] = useState('all'); // useState for filter

  // useMemo: Memoize filtered tasks to prevent re-computation on every render
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return state.tasks.filter(task => !task.completed);
      case 'completed':
        return state.tasks.filter(task => task.completed);
      default:
        return state.tasks;
    }
  }, [state.tasks, filter]);

  return (
    <div>
      <h2>All Tasks</h2>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button className="floating-btn">+</button>

      </div>
      <div className="task-container">

<TaskItem task={{title:"Complete Project", description:"Finish React Task Manager"}} />

<TaskItem task={{title:"Study React", description:"Learn hooks and context"}} />

<TaskItem task={{title:"Workout", description:"30 minutes exercise"}} />

</div>

      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} /> // Props passed
        ))
      )}
    </div>
  );
};

export default Tasks;

