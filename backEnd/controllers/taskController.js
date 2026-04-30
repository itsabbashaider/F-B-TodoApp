const Task = require("../models/taskModel");

/* ======================
    CREATE TASK
====================== */
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({ title, description });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ======================
    GET ALL TASKS
====================== */
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ======================
    UPDATE TASK
====================== */
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await Task.findByPk(id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    await task.update({ title, description });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ======================
    TOGGLE COMPLETE
====================== */
exports.toggleTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ======================
    DELETE TASK
====================== */
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    await task.destroy();

    res.json({ msg: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};