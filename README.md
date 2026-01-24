## Node.js Authentication Backend

Purpose
This repository contains a learning-focused, production-structured backend authentication system built using Node.js, Express, and MySQL.

The primary goal of this project is not just to implement authentication features, but to deeply understand backend execution flow, layered architecture, database interaction, and real-world debugging scenarios. The project is built step by step, focusing on correctness, clarity, and reasoning rather than rushing features.

This README reflects the current completed state of the project and will be extended as development continues.

---

### Tech Stack

Node.js  
Express.js  
MySQL  
mysql2  
bcryptjs  
dotenv  
nodemon (development)

---

### Project Structure

src/  
app.js  
server.js  
config/  
db.js  
models/  
user.model.js  
auth/  
auth.routes.js  
auth.controller.js  
auth.service.js

---

### Architectural Approach

This project follows a layered backend architecture where each layer has a single, clear responsibility.

### Request flow:

**Client** → **Route** → **Controller** → **Service** → **Model** → **Database** → **Response**

Routes handle URL mapping.
Controllers handle HTTP concerns and validation.
Services contain business logic.
Models handle database queries only.

This separation makes the system easier to debug, test, and scale.

---

## Implemented

1. Server and Application Setup
   The Express server is initialized with a clean entry point. Environment variables are loaded using dotenv, and a development workflow is configured using nodemon.

2. Database Connection
   A MySQL connection pool is configured using mysql2. Database connectivity is verified during server startup, ensuring early detection of configuration issues.

3. User Database Schema
   A users table is designed with proper constraints, including required fields, unique email enforcement, ENUM-based roles, and timestamp tracking.

4. User Registration (Signup) API
   A POST /auth/register API is implemented.
   It performs input validation, checks for duplicate users, hashes passwords securely, inserts users into the database, and returns a safe response without exposing sensitive data.

5. Password Security
   Passwords are hashed using bcrypt before storage. Plain-text passwords are never saved, following security best practices.

6. Execution Flow Understanding
   The project emphasizes understanding how an API request moves through the backend:

Postman request → Express route → Controller → Service → Model → MySQL → Response back to client.

Each step was traced and debugged during development.

7. Real-World Debugging Experience
   Several real backend issues were encountered and resolved, including environment variable misconfiguration, database constraint violations, ENUM errors, SQL insert order mismatches, and import/export mistakes. Each issue was fixed by tracing execution flow instead of guessing.

---

### Testing

APIs are tested using Postman with proper JSON request bodies and headers. Database changes are verified using MySQL Workbench. Duplicate registrations are correctly rejected.

---

Current Status

Server is running successfully.
Database connection is stable.
User signup functionality is complete and working.
Password hashing is verified.
Layered architecture is in place.

This repository represents a solid backend foundation built with an execution-flow-first mindset.

---

Notes

This project is intentionally built slowly and carefully to strengthen backend fundamentals. The focus is on understanding how things work internally rather than simply making features work.

The README will be updated as new features such as login and token-based authentication are added.

---

License

This project is created for learning and educational purposes.
