import React, { useState, useRef } from 'react'; // Hooks: useState, useRef
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = ({ onSubmit, initialData = {} }) => { // Props: onSubmit callback, initialData
  const [formData, setFormData] = useState({ // useState for form state
    title: initialData.title || '',
    body: initialData.body || ''
  });
  const [errors, setErrors] = useState({}); // Validation state
  const titleRef = useRef(null); // useRef for focus

  const navigate = useNavigate();
  const { id } = useParams(); // For edit mode

  React.useEffect(() => {
    titleRef.current?.focus(); // Auto-focus on mount
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.body.trim()) newErrors.body = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' }); // Clear error
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
    setFormData({ title: '', body: '' }); // Reset
    setErrors({});
    if (!id) navigate('/tasks'); // Redirect after add
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          ref={titleRef}
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task Title"
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>
      <div>
        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Task Description"
        />
        {errors.body && <span className="error">{errors.body}</span>}
      </div>
      <button type="submit">{id ? 'Update Task' : 'Add Task'}</button>
      <button type="button" onClick={() => navigate('/tasks')}>Cancel</button>
    </form>
  );
};

export default TaskForm;