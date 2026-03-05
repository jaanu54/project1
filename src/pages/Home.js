import React from "react";

function Home() {
  return (
    <div className="app-container">

      {/* Navbar */}

      <nav>
        <h1>TaskFlow</h1>

        <div>
          <a href="/">Home</a>
          <a href="/tasks">Tasks</a>
          <a href="/add">Add Task</a>
        </div>
      </nav>


      {/* Hero Section */}

      <div className="hero">

        <div className="hero-text">
          <h2>Organize Your Life<br/>One Task at a Time</h2>

          <p>
            Plan, manage and complete your tasks efficiently.
            Stay productive and achieve your goals faster.
          </p>

          <button className="btn">View Tasks</button>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/4149/4149678.png"
          alt="task illustration"
        />

      </div>


      {/* Features */}

      <div className="features">

        <div className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"/>
          <h3>Create Tasks</h3>
          <p>Add and organize tasks easily.</p>
        </div>

        <div className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"/>
          <h3>Edit Tasks</h3>
          <p>Update tasks anytime with flexibility.</p>
        </div>

        <div className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png"/>
          <h3>Complete Tasks</h3>
          <p>Track progress and stay productive.</p>
        </div>

      </div>

    </div>
  );
}

export default Home;

