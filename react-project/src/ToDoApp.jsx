import React, { useState } from "react";

function ToDoApp() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

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
         title, description 
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

  return (
    <div>
      <h1>To-Do App</h1>
      <form onSubmit={submmitHandler}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{editId ? "Update Task" : "Add Task"}</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => toggleComplete(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => editTask(task.id)}>Edit</button> 
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoApp;