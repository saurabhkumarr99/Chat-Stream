# Task Manager

## Description

Welcome to the Task Manager! This application serves as a platform where users can manage their tasks efficiently. Users can create, update, delete, and view tasks using this application. It provides a user-friendly interface for organizing tasks and staying productive.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Jest
- Supertest

## Project Links


- GitHub: [Task Manager](https://github.com/saurabhkumarr99/Task-Manger)


## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoint](#APIEndpoints)
- [Components Structure](#components-structure)
- [Screenshots](#screenshots)
- [Author](#author)

## Features


- **User Authentication:** Users can register and log in to manage their tasks securely.
- **Task Management:** Users can create, update, delete, and view tasks.
- **RESTful API:** Provides API endpoints for CRUD operations on tasks.
- **Database Integration:** Utilizes PostgreSQL to store task data.
- **Unit Testing:** Jest framework is used for unit testing with full test coverage.
- **Integration Testing:** Supertest library is used for testing API endpoints.
- **User-Friendly Interface:** Offers an intuitive interface for task management.

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your computer.
- PostgreSQL installed locally or remotely.


Follow these steps to run the IPO Tracker App locally:

1. **Unzip the Task Manager:**

2. **Navigate to the project directory:**

   ```bash
   cd Task Manager
   ``` 

2. **Install Dependencies:**

   ```bash
   npm install
   ``` 

3. **DB Quries:**

   ```bash
   CREATE DATABASE task_manager;

   CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
   );

   CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INTEGER REFERENCES users(id)
   );

   ``` 

4. **Run:**

 - `Start Project`
   ```bash
      node app.js
   ``` 

 - `Test Project`
   ```bash
      npm test
   ``` 

 - `Test Coverage`
   ```bash
      npm run coverage
   ``` 

## Usage

- **User Registration:** Users can register for an account using their email address and password.
- **User Login:** Registered users can log in to their accounts securely.
- **Task Creation:** Authenticated users can create new tasks by providing a title and description.
- **Task Update:** Users can update existing tasks by modifying their title and description.
- **Task Deletion:** Users can delete unwanted tasks from their task list.
- **Task Viewing:** Users can view a list of all tasks they have created.

## API Endpoints

### Users

- **POST /api/users/register:** Register a new user.
- **POST /api/users/login:** Log in an existing user.

### Tasks

- **GET /api/tasks:** Get all tasks.
- **GET /api/tasks/:id:** Get a specific task by ID.
- **POST /api/tasks:** Create a new task.
- **PUT /api/tasks/:id:** Update an existing task.
- **DELETE /api/tasks/:id:** Delete a task by ID.

## Code Structure

The project follows a structured directory layout for better organization:

- **api/**
- **coverage/**
- **ScreenShots/**
- **App.js**
- **README.md**

## Author

- SAURABH KUMAR RAI