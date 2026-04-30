import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import ConfirmModal from "./ConfirmModal";

function ToDoApp() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [originalTask, setOriginalTask] = useState(null);

  const [confirm, setConfirm] = useState({
    open: false,
    type: null,
    taskId: null,
  });

  /* =======================
        FETCH ALL TASKS
  ======================= */
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    const loadTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  loadTasks();
  }, []);
  
  /* =======================
        SUBMIT HANDLER
  ======================= */
  const submmitHandler = async (e) => {
    e.preventDefault();

    if (mode === "view") return;

    if (!title || !description) {
      alert("Please fill in both fields");
      return;
    }

    try {
      if (mode === "create") {
        await fetch("http://localhost:5000/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        });
      }

      if (mode === "edit") {
        await fetch(`http://localhost:5000/api/tasks/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        });
      }

      await fetchTasks(); 

      // reset
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
      setEditId(null);
    } catch (err) {
      console.log(err);
    }
  };

  /* =======================
        ACTIONS
  ======================= */

  const toggleComplete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}/toggle`, {
        method: "PATCH",
      });

      await fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });

      await fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const editTask = (id) => {
    const task = tasks.find((t) => t.id === id);

    setMode("edit");
    setTitle(task.title);
    setDescription(task.description);
    setOriginalTask(task);
    setEditId(id);
    setIsModalOpen(true);
  };

  const openCreate = () => {
    setMode("create");
    setTitle("");
    setDescription("");
    setOriginalTask(null);
    setEditId(null);
    setIsModalOpen(true);
  };

  const openDetail = (id) => {
    const task = tasks.find((t) => t.id === id);

    setMode("view");
    setTitle(task.title);
    setDescription(task.description);
    setOriginalTask(task);
    setEditId(null);
    setIsModalOpen(true);
  };

  const truncate = (text, limit = 40) => {
    return text.length > limit
      ? text.slice(0, limit) + "..."
      : text;
  };

  /* =======================
        UI
  ======================= */

  return (
    <div className="todo-app">
      <h1>To-Do App</h1>

      <button className="plus-button" onClick={openCreate}>
        +
      </button>

      <div className="todo-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`todo-item ${
              task.completed ? "completed" : ""
            }`}
            onClick={() => openDetail(task.id)}
          >
            <div className="text">
              <h3>{task.title}</h3>
              <p>{truncate(task.description)}</p>
            </div>

            <div className="actions">
              <button
                className="Neutral"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleComplete(task.id);
                }}
              >
                ✓
              </button>

              <button
                className="Primary"
                onClick={(e) => {
                  e.stopPropagation();
                  editTask(task.id);
                }}
              >
                ✎
              </button>

              <button
                className="Destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirm({
                    open: true,
                    type: "delete",
                    taskId: task.id,
                  });
                }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        mode={mode}
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        onClose={() => setIsModalOpen(false)}
        onSubmit={submmitHandler}
        originalTask={originalTask}
      />

      {/* CONFIRM MODAL */}
      <ConfirmModal
        isOpen={confirm.open}
        message={
          confirm.type === "delete"
            ? "Are you sure you want to delete?"
            : "Are you sure?"
        }
        onConfirm={() => {
          if (confirm.type === "delete") {
            deleteTask(confirm.taskId);
          }

          setConfirm({ open: false, type: null, taskId: null });
        }}
        onCancel={() =>
          setConfirm({ open: false, type: null, taskId: null })
        }
      />
    </div>
  );
}

export default ToDoApp;