/* ===========================
   IMPORTS
   =========================== */
import React, { useState } from "react";

/* ===========================
   MAIN COMPONENT
   =========================== */
function ToDoApp() {
  /* ===========================
     STATE MANAGEMENT
     =========================== */
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  /* ===========================
     EVENT HANDLERS
     =========================== */
  const submmitHandler = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill in both fields");
      return;
    }
    if (editId) {
      setTasks(tasks.map((task) =>
        task.id === editId ? { ...task, title, description } : task
      ));
      setEditId(null);
    } else {
      setTasks([...tasks, { 
        id: Date.now(),
        title, 
        description 
      }]);
    }
    setTitle("");
    setDescription("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    setTitle(task.title);
    setDescription(task.description);
    setEditId(id);
  };

  /* ===========================
     RENDER
     =========================== */
  return (
    <div className="todo-app">
      <h1>To-Do App</h1>

      {/* Form Section */}
      <form onSubmit={submmitHandler}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="form-actions">
          <button type="submit">
            {editId ? "Update" : "Add Task"}
          </button>
          <button type="button" onClick={() => {
            setTitle("");
            setDescription("");
            setEditId(null);
          }}>
            Clear
          </button>
        </div>

        {/* Preview Section */}
        {(title || description) && (
          <div className="preview">
            <h4>Preview:</h4>
            <div className="preview-content">
              {title && <h3>{title}</h3>}
              {description && <p>{description}</p>}
            </div>
          </div>
        )}
      </form>

      {/* Todo List Section */}
      <div className="todo-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`todo-item ${task.completed ? "completed" : ""}`}
          >
            <div className="text">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>

            <div className="actions">
              <button onClick={() => toggleComplete(task.id)}>
                ✓
              </button>
              <button onClick={() => editTask(task.id)}>
                ✎
              </button>
              <button onClick={() => deleteTask(task.id)}>
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDoApp;