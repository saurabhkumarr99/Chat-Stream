# Chat Stream

## Description

Welcome to Chat Stream! This application provides a platform for real-time communication through chat. Users can join chat rooms, send messages, and interact with other users in real-time. It offers a seamless and intuitive interface for connecting with friends, colleagues, or communities.

## Technologies Used

- Node.js
- Express.js
- WebSocket
- PostgreSQL
- Redis
- JWT (JSON Web Tokens)
- bcrypt
- Jest
- Supertest

## Project Links


- GitHub: [Chat Stream](https://github.com/saurabhkumarr99/Chat-Stream)


## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Author](#author)

## Features


- **Real-time Chat:** Users can engage in real-time conversations with other users.
- **Chat Rooms:** Multiple chat rooms are available for users to join based on their interests.
- **User Authentication:** Secure user authentication using JWT tokens and bcrypt for password hashing.
- **Database Integration:** Utilizes PostgreSQL for storing user data and Redis for caching.
- **WebSockets:** WebSocket protocol for real-time communication between clients and server.
- **Unit Testing:** Jest framework is used for unit testing with full test coverage.
- **Integration Testing:** Supertest library is used for testing API endpoints.
- **User-Friendly Interface:** Offers an intuitive interface for seamless chatting experience.

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your computer.
- PostgreSQL and Redis installed locally or remotely.


Follow these steps to run the Chat Stream App locally:

1. **Unzip the Chat Stream:**

2. **Navigate to the project directory:**

   ```bash
   cd chat-stream
   ```


2. **Install Dependencies:**

   ```bash
   npm install
   ``` 

3. **DB Quries:**

   ```bash
   CREATE DATABASE Chat-stream;

   -- Create the users table
      CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       username VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL
      );

   -- Create the messages table
      CREATE TABLE messages (
        id SERIAL PRIMARY KEY,
        message TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );


   ``` 

4. **Run:**

 - `Start Project`
   ```bash
      node server.js
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
- **Join Chat Rooms:** Users can join existing chat rooms to participate in conversations.
- **Send Messages:** Users can send messages in chat rooms, and the messages will be displayed in real-time to other users in the same chat room.
- **Create Chat Rooms:** Admin users can create new chat rooms and manage them.
- **Logout:** Users can log out of their accounts to end their session securely.

## API Endpoints

### Authentication

- **POST /api/auth/register:** Register a new user.
- **POST /api/auth/login:** Log in an existing user.


### Messages

- **GET /api/messages:** Get all messages.
- **POST /api/messages:** Send a new message.
- **GET /api/messages/:id:** Get details of a specific message.
- **PUT /api/messages/:id:** Update details of a message.
- **DELETE /api/messages/:id:** Delete a message.

## Code Structure

The project follows a structured directory layout for better organization:

- **config/**
- **coverage/**
- **controllers**
- **Jmeter Testing**
- **test**
- **server.js**
- **README.md**

## Author

- SAURABH KUMAR RAI