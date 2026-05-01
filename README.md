# 📝 Todo App

A simple full-stack Todo application built with Node.js, Express, Sequelize, and PostgreSQL.

---

## 🚀 Tech Stack

### Backend

* Node.js
* Express.js
* Sequelize ORM
* PostgreSQL
* CORS

### Frontend

* JavaScript
* HTML
* CSS

---

## 📁 Project Structure

```
project/
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── index.css
│   ├── modal/
│   ├── confirmModal/
│   ├── todo-app/
│   ├── app.js
│   └── main.js
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2. Install backend dependencies

```
cd backend
npm install
```

---

### 3. Setup environment variables

Create a `.env` file inside the backend folder:

```
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_db_password
DB_HOST=localhost
```

---

### 4. Run the backend server

```
npm start
```

---

### 5. Run the frontend

Open the frontend folder and run it using Live Server or any local server.

---

## ✨ Features

* Create tasks
* View all tasks
* Update tasks
* Delete tasks
* Toggle task completion

---

## 📌 Notes

* Make sure PostgreSQL is running locally
* Do not commit your `.env` file
* This is a beginner-friendly project for learning full-stack development

---

## 📈 Future Improvements

* Add user authentication (JWT)
* Connect tasks to users
* Add validation (Joi/Zod)
* Improve UI/UX

---
