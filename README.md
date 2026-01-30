# Node.js Authentication Backend

## Purpose

This repository contains a **learning-focused, production-structured authentication backend** built using **Node.js, Express, and MySQL**.

The goal of this project is **not just to implement authentication**, but to **deeply understand backend execution flow**, layered architecture, middleware behavior, database interaction, and **real-world debugging techniques** used by professional backend engineers.

The project is built **phase by phase**, ensuring every layer is clearly understood before moving forward.

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2
- bcryptjs
- jsonwebtoken
- dotenv
- nodemon (development)

---

## Complete Folder Structure

```
src/
├── server.js                 # Entry point – starts the server
├── app.js                    # Application brain – middleware & routes
│
├── config/
│   └── db.js                 # Database connection setup
│
├── middlewares/
│   ├── auth.middleware.js    # JWT verification middleware
│   └── role.middleware.js    # Role-based authorization middleware
│
├── models/
│   └── user.model.js         # Database queries (users table)
│
├── auth/
│   ├── auth.routes.js        # Auth-related routes
│   ├── auth.controller.js    # HTTP handling & responses
│   └── auth.service.js       # Business logic (auth rules)
│
└── utils/
    └── token.util.js         # JWT generation helper
```

This structure ensures **clear separation of concerns** and mirrors real production backends.

---

## Architectural Approach

The project follows a **layered backend architecture**, where each layer has **one responsibility only**.

### Core Request Flow

**Client**
→ **Middleware**
→ **Route**
→ **Controller**
→ **Service**
→ **Model**
→ **Database**
→ **Response**

### Responsibility Breakdown

- **server.js**
  - Starts the HTTP server
  - Does not contain app logic

- **app.js**
  - Registers middleware
  - Registers routes with prefixes
  - Controls request entry into the system

- **Middlewares**
  - Handle cross-cutting concerns (JWT, roles)
  - Execute before controllers

- **Routes**
  - Map URLs to controllers
  - No logic

- **Controllers**
  - Handle HTTP request & response
  - Call services
  - No business logic

- **Services**
  - Contain business rules
  - Handle authentication logic
  - Coordinate models

- **Models**
  - Execute database queries only

---

## Development Phases (ALL 7 PHASES)

---

## 🟢 Phase 1 – Server & Application Setup

- Express server initialized via `server.js`
- Application logic separated into `app.js`
- Environment variables loaded using `dotenv`
- Development workflow configured using `nodemon`

**Key learning:**
Understanding the difference between **starting the server** and **handling requests**.

---

## 🟢 Phase 2 – Database Connection

- MySQL connection pool created using `mysql2`
- Database connection tested during app startup
- Fail-fast strategy for DB misconfiguration

**Key learning:**
Database issues should surface early, not during API execution.

---

## 🟢 Phase 3 – Routing Layer

- Routes organized using `auth.routes.js`
- Route prefixes registered in `app.js`
- Final URLs formed using:

  ```
  app.js prefix + route path
  ```

Example:

```
/auth + /register → /auth/register
```

**Key learning:**
Most `Cannot GET /…` errors originate from incorrect routing setup.

---

## 🟢 Phase 4 – Controller Layer

- Controllers handle:
  - Request data extraction
  - Validation checks
  - Sending responses

- Controllers do **not**:
  - Talk to the database
  - Contain business logic

**Key learning:**
Controllers act as **traffic managers**, not decision makers.

---

## 🟢 Phase 5 – Service Layer (Business Logic)

- Authentication logic implemented in services
- Responsibilities include:
  - Checking existing users
  - Hashing passwords
  - Generating tokens
  - Applying business rules

**Key learning:**
Business logic must remain independent of HTTP and Express.

---

## 🟢 Phase 6 – Middleware (JWT & Roles)

### JWT Authentication Middleware

- Extracts token from request headers
- Verifies token validity
- Attaches decoded user data to `req.user`

### Role Authorization Middleware

- Reads `req.user`
- Checks allowed roles
- Blocks unauthorized access

**Execution order:**

```
Request
 → JWT middleware
 → Role middleware
 → Controller
```

**Key learning:**
Middleware runs **before controllers** and controls access flow.

---

## 🟢 Phase 7 – Database Models & Data Flow

- Models contain **only SQL queries**
- No HTTP or business logic
- Services call models
- Data flows back up to controllers

**Key learning:**
Models are data access layers, not decision makers.

---

## Implemented API (Current)

### User Registration

**Endpoint**

```
POST /auth/register
```

**Flow**

```
Client
 → auth.routes.js
 → auth.controller.js
 → auth.service.js
 → user.model.js
 → MySQL
 → Response
```

**Features**

- Input validation
- Duplicate email prevention
- Password hashing using bcrypt
- Safe response (no sensitive data)

---

## Testing

- APIs tested using **Postman**
- Database verified using **MySQL Workbench**
- Duplicate registration handled correctly
- Error scenarios tested intentionally

---

## Current Status

- Server runs reliably
- Database connection stable
- Signup API complete
- JWT middleware implemented
- Role-based authorization in place
- Full layered architecture implemented
- Execution flow clearly understood

---

## Notes

This project is intentionally built **slowly and methodically** to strengthen backend fundamentals.

The focus is on:

- Execution flow understanding
- Debugging with logic
- Clean architecture
- Production-ready thinking

This repository represents a **strong backend foundation**, not just a demo app.

---

## License

This project is created for **learning and educational purposes**.

---
