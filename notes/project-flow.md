# nodejs-auth-backend

## 🚀 Production-Grade Authentication Backend

A scalable, production-structured authentication system built using Node.js, Express, and MySQL.

This project demonstrates real-world backend engineering practices including layered architecture, JWT-based authentication, refresh token lifecycle management, role-based access control (RBAC), and API documentation using Swagger.

---

## 🎯 Problem Statement

Most beginner authentication systems are built as simple CRUD applications without proper structure, scalability, or security considerations.

This project solves that by implementing a clean, production-ready authentication system that reflects how backend services are designed in real-world applications.

---

## ⚡ Key Highlights

- Clean layered architecture (Controller → Service → Model)
- JWT authentication with refresh token lifecycle
- Role-based access control (RBAC)
- Centralized error handling middleware
- Swagger API documentation for testing
- Secure password hashing using bcrypt
- Production-ready backend structure

## Overview

This repository contains a **production-structured authentication backend** built using **Node.js, Express, and MySQL**.

The goal of this project is **not just to implement authentication**, but to **deeply understand backend execution flow**, layered architecture, middleware behavior, database interaction, token-based authentication, and **real-world debugging techniques used by professional backend engineers**.

The project is built **phase by phase**, ensuring each layer and concept is clearly understood before moving forward.

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
- Swagger UI (API documentation & testing)

---

## 🧠 Technical Decisions

- **JWT Authentication** → Enables stateless and scalable authentication
- **Refresh Tokens** → Allows secure session continuation without re-login
- **MySQL** → Structured relational database for user management
- **Layered Architecture** → Improves maintainability, scalability, and testability
- **Middleware-based Design** → Centralizes cross-cutting concerns like auth and error handling

## Complete Folder Structure

```
src/
├── server.js                 # Entry point – starts the HTTP server
├── app.js                    # Application core – middleware & routes
│
├── config/
│   ├── db.js                 # MySQL connection pool
│   └── swagger.js            # Swagger/OpenAPI configuration
│
├── middleware/
│   ├── auth.middleware.js    # JWT verification middleware
│   ├── role.middleware.js    # Role-based authorization (RBAC)
│   └── error.middleware.js   # Centralized error handling
│
├── models/
│   └── user.model.js         # Database queries (users table)
│
├── auth/
│   ├── auth.routes.js        # Authentication routes
│   ├── auth.controller.js    # HTTP request/response handling
│   └── auth.service.js       # Business logic (auth rules)
│
└── utils/
    └── token.util.js         # JWT generation helpers
```

This structure enforces **separation of concerns** and mirrors **real production backends**.

---

## Architectural Approach

The project follows a **layered backend architecture**, where each layer has **one clear responsibility**.

### Core Request Flow

```
Client
 → Middleware
 → Routes
 → Controller
 → Service
 → Model
 → Database
 → Response
```

---

## Responsibility Breakdown

### `server.js`

- Starts the HTTP server
- Listens on a configured port
- Contains no application logic

### `app.js`

- Registers global middleware
- Registers route prefixes
- Acts as the entry point for all requests

### Middleware

- Handle cross-cutting concerns
- Execute **before controllers**
- Examples:
  - JWT authentication
  - Role-based authorization
  - Global error handling

### Routes

- Map URLs to controllers
- No business logic

### Controllers

- Handle HTTP input & output
- Perform validation
- Call services
- Do **not** contain business logic

### Services

- Contain authentication and authorization rules
- Hash passwords
- Generate JWTs
- Coordinate model calls

### Models

- Execute SQL queries only
- No HTTP logic
- No business decisions

---

## Development Phases

### 🟢 Phase 1 – Server & Application Setup

- Express server initialized
- `server.js` vs `app.js` separation
- Environment variables loaded with dotenv
- Development workflow using nodemon

**Key learning:** Server startup and request handling are separate responsibilities.

---

### 🟢 Phase 2 – Database Connection

- MySQL connection pool using `mysql2`
- Connection verified at startup
- Fail-fast strategy for DB misconfiguration

**Key learning:** Database issues should surface early, not during API execution.

---

### 🟢 Phase 3 – Routing Layer

- Routes organized by feature
- Route prefixes registered in `app.js`

Example:

```
/auth + /login → /auth/login
```

**Key learning:** Most `Cannot GET /...` errors originate from routing misconfiguration.

---

### 🟢 Phase 4 – Controller Layer

Controllers handle:

- Request data extraction
- Validation
- Response formatting

Controllers do **not**:

- Access the database
- Contain business logic

**Key learning:** Controllers are traffic managers, not decision makers.

---

### 🟢 Phase 5 – Service Layer (Business Logic)

- User registration logic
- Password hashing using bcrypt
- Login verification
- JWT generation
- Business rules enforced here

**Key learning:** Business logic must be independent of Express and HTTP.

---

### 🟢 Phase 6 – Middleware (JWT & RBAC)

#### JWT Authentication Middleware

- Extracts token from `Authorization` header
- Verifies token signature & expiry
- Attaches decoded payload to `req.user`

#### Role Authorization Middleware

- Reads `req.user.role`
- Blocks unauthorized access

Execution order:

```
Request
 → JWT middleware
 → Role middleware
 → Controller
```

**Key learning:** Middleware controls access flow before controllers execute.

---

### 🟢 Phase 7 – Database Models & Data Flow

- Models contain SQL only
- Services call models
- Data flows upward to controllers

**Key learning:** Models are data access layers, not logic layers.

---

### 🟢 Phase 8 – JWT Refresh Tokens & Logout

- Short-lived access tokens
- Long-lived refresh tokens
- Refresh tokens stored & validated
- Logout revokes refresh tokens
- Token regeneration preserves role data

**Key learning:** Authentication must support secure session continuation and revocation.

---

### 🟢 Phase 9 – Swagger UI (API Documentation & Testing)

- Swagger UI added as API-first “UI”
- All auth endpoints documented
- JWT Bearer authentication supported
- Protected routes testable in browser

**Key learning:** Backend services can be demonstrated and tested without a frontend.

---

## Implemented APIs (Current)

### User Registration

**POST `/auth/register`**

Features:

- Input validation
- Duplicate email prevention
- Password hashing
- Safe response (no sensitive data)

---

### User Login

**POST `/auth/login`**

Features:

- Credential verification
- Access token generation
- Refresh token generation
- Role embedded in JWT payload

---

### Token Refresh

**POST `/auth/refresh`**

Features:

- Issues new access token
- Preserves user identity & role
- Does not require re-login

---

### Logout

**POST `/auth/logout`**

Features:

- Refresh token revocation
- Session invalidation

---

### Protected User Profile

**GET `/auth/user/profile`**

Features:

- JWT authentication
- Role-based authorization
- Access controlled by middleware

---

## How to Test the APIs (Swagger UI)

### Open Swagger UI

```
http://localhost:5000/api-docs
```

### Step 1: Login

- Call `POST /auth/login`
- Copy the **accessToken**

### Step 2: Authorize

- Click **Authorize 🔒**
- Paste:

```
Bearer <accessToken>
```

### Step 3: Call Protected APIs

- Execute `GET /auth/user/profile`

### Step 4: Refresh Token (Optional)

- Call `POST /auth/refresh`
- Re-authorize with new access token

---

## Current Status

- Server stable
- Database connection reliable
- Full auth lifecycle implemented
- Refresh tokens & logout supported
- Swagger UI enabled
- Layered architecture complete
- Execution flow fully understood

---

## Notes

This project is intentionally built **slowly and methodically** to strengthen backend fundamentals.

The focus is on:

- Execution flow understanding
- Debugging with logic
- Clean architecture
- Production-ready thinking

This repository represents a **strong backend foundation**, not just a demo application.

---

## License

This project is created for **learning and educational purposes**.
