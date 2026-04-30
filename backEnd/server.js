const express = require("express");
const app = express();
const cors = require("cors");

const sequelize = require("./config/db"); 
const taskRoutes = require("./routes/taskRoutes");

const PORT = 5000;

// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// DB + Server start
sequelize.authenticate()
  .then(() => {
    console.log("Database connected...");
    return sequelize.sync({alter: true}); 
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error:", err);
  });