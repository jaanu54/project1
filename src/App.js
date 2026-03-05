import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext'; // Context wrapper
import Header from './components/Header';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import EditTask from './pages/EditTask';

function App() {
  return (
    <Router>
      <TaskProvider> {/* Wrap app with Context Provider */}
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/add-task" element={<EditTask />} />
            <Route path="/edit-task/:id" element={<EditTask />} />
          </Routes>
        </div>
      </TaskProvider>
    </Router>
  );
}

export default App;