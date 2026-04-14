import React, { useState } from "react";
import Modal from "./Modal";
import Buttons from "./Buttons";
import ConfirmModal from "./ConfirmModal";

function ToDoApp() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("create")

  /* =======================
        HANDLER
  ======================= */

  const submmitHandler = (e) => {
    e.preventDefault();

    if (mode === "view") return;

    if (!title || !description) {
      alert("Please fill in both fields");
      return;
    }

    if (mode === "edit") {
      setTasks(
        tasks.map((task) =>
          task.id === editId
            ? { ...task, title, description }
            : task
        )
      );
    }

    if (mode === "create") {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title,
          description,
          completed: false,
        },
      ]);
    }

    // reset + close
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
    setEditId(null);
  };

  /* =======================
        ACTIONS
  ======================= */
    const [confirm, setConfirm] = React.useState({
      open: false,
      type: null,
      taskid: null,
    });

  const truncate = (text, limit = 40) => {
    return text.length > limit
      ? text.slice(0, limit) + "..."
      : text;
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    const task = tasks.find((t) => t.id === id);

    setMode("edit")
    setTitle(task.title);
    setDescription(task.description);
    setEditId(id);
    setIsModalOpen(true)
  };

  const openCreate = () => {
    setMode("create")
    setTitle("");
    setDescription("");
    setEditId(null);
    setIsModalOpen(true)
  };

  const openDetail = (id) => {
    const task = tasks.find((t) => t.id === id);

    setMode("view")
    setTitle(task.title)
    setDescription(task.description)
    setEditId(null)
    setIsModalOpen(true)
  };

  /* =======================
        UI
  ======================= */

  return (
    <div className="todo-app">
      <h1>To-Do App</h1>

      {/* LIST */}
      {(
        <>
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
                <div
                  className="text" 
                >
                  <h3>{task.title}</h3>
                  <p>{truncate(task.description, 40)}</p>
                </div>

                <div className="actions">
                  <button className="Neutral"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleComplete(task.id);
                    }}
                  >
                    ✓
                  </button>

                  <button className="Primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      editTask(task.id);
                    }}
                  >
                    ✎
                  </button>

                  <button className="Destructive"
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
        </>
      )}
      <Modal
        isOpen={isModalOpen}
        mode={mode}
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        onClose={() => setIsModalOpen(false)}
        onSubmit={submmitHandler}
      />
              {/* CONFIRMATION MODAL */}
      <ConfirmModal 
        isOpen={confirm.open}
        message={
          confirm.type === "delete"
            ? "Are you sure you want to delete?"
            : "Are you sure you want to cancel?"
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