# 🚀 Node.js Auth Backend (Production-Ready)

A scalable, production-grade authentication and authorization backend built using Node.js, Express, and MySQL.

This project demonstrates real-world backend engineering practices including JWT-based authentication, refresh token lifecycle management, role-based access control (RBAC), and secure API design.

---

## 🌐 Live API

**Base URL**

```
https://auth-backend-hta6.onrender.com
```

**Swagger Documentation**

```
https://auth-backend-hta6.onrender.com/api-docs
```

---

## ⚡ Key Features

- JWT-based authentication (Access + Refresh tokens)
- Secure refresh token lifecycle with DB persistence
- Role-based access control (RBAC)
- Layered architecture (Controller → Service → Model)
- Centralized error handling
- API rate limiting (DDoS/basic abuse protection)
- Secure HTTP headers using Helmet
- CORS configuration for controlled access
- Swagger UI for API testing & documentation

---

## 🏗️ Architecture

This project follows a clean, layered architecture used in production systems:

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

### Responsibilities

- **Controllers** → Handle HTTP requests/responses
- **Services** → Business logic & authentication rules
- **Models** → Database queries only
- **Middleware** → Authentication, authorization, error handling

---

## 🧠 Technical Design Decisions

- **JWT Authentication**
  Stateless authentication for scalability

- **Refresh Tokens (DB-backed)**
  Enables secure session continuation and token revocation

- **MySQL (Relational DB)**
  Structured user and token management

- **Layered Architecture**
  Improves maintainability, testability, and scalability

- **Middleware-driven flow**
  Centralizes cross-cutting concerns like auth and error handling

---

## 🔐 Security Features

- Password hashing using bcrypt
- JWT expiration handling
- Refresh token revocation (logout support)
- Rate limiting (100 requests / 15 minutes per IP)
- Helmet for secure HTTP headers
- CORS protection

---

## 📦 Tech Stack

- Node.js
- Express.js
- MySQL (mysql2)
- bcryptjs
- jsonwebtoken
- dotenv
- Swagger UI

---

## 📁 Project Structure

```
src/
├── server.js
├── app.js
│
├── config/
│   ├── db.js
│   └── swagger.js
│
├── middleware/
│   ├── auth.middleware.js
│   ├── role.middleware.js
│   └── error.middleware.js
│
├── models/
│   ├── user.model.js
│   └── refreshToken.model.js
│
├── auth/
│   ├── auth.routes.js
│   ├── auth.controller.js
│   └── auth.service.js
│
└── utils/
    └── token.util.js
```

---

## 🔌 API Endpoints

### 🔑 Authentication

#### Register

```
POST /api/v1/auth/register
```

#### Login

```
POST /api/v1/auth/login
```

#### Refresh Token

```
POST /api/v1/auth/refresh
```

#### Logout (Revoke Token)

```
POST /api/v1/auth/logout
```

---

### 👤 Protected Routes

#### Get Profile

```
GET /api/v1/auth/user/profile
```

Requires:

```
Authorization: Bearer <access_token>
```

---

## 🧪 API Testing (Swagger)

1. Open:

```
/api-docs
```

2. Login → Copy access token

3. Click **Authorize**

```
Bearer <access_token>
```

4. Test protected APIs

---

## 🚀 Deployment

- **Backend**: Render
- **Database**: Railway (MySQL)

### Environment Variables

```
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=
JWT_REFRESH_SECRET=
PORT=
```

---

## 📊 Current Status

- Production deployment complete
- Database integrated (cloud MySQL)
- Full authentication lifecycle implemented
- Token refresh & revocation working
- Protected routes secured with middleware
- Swagger documentation available

---

## 📌 Notes

This project reflects a real-world backend service structure and demonstrates:

- Clean code organization
- Secure authentication practices
- Proper separation of concerns
- Production deployment workflow

---

## 📜 License

This project is for educational and demonstration purposes.

---
