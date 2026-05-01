# 🚀 Node.js Auth Backend (Production-Ready)

A scalable authentication and authorization backend built with **Node.js, Express, and MySQL**, designed using real-world backend engineering practices.

This project implements a complete authentication lifecycle including JWT-based login, refresh token management, and role-based access control (RBAC), and is fully deployed in production.

---

## 🌐 Live Demo

- **API Base URL**
  [https://auth-backend-hta6.onrender.com](https://auth-backend-hta6.onrender.com)

- **Swagger Docs (Test APIs)**
  [https://auth-backend-hta6.onrender.com/api-docs](https://auth-backend-hta6.onrender.com/api-docs)

---

## ⚡ What This Project Demonstrates

- Stateless authentication using **JWT (Access + Refresh tokens)**
- Secure **refresh token lifecycle with database persistence**
- **Role-Based Access Control (RBAC)**
- Clean layered architecture used in production systems
- API security (rate limiting, headers, CORS)
- Container-ready backend (Docker support)

---

## 🧪 Quick Start (Local)

```bash
npm install
npm run dev
```

Then open:

```
http://localhost:5000/api-docs
```

---

## 🐳 Run with Docker (Optional)

```bash
docker compose up --build
```

---

## 🏗️ Architecture

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

- **Controllers** → Handle request/response
- **Services** → Business logic & authentication
- **Models** → Database queries
- **Middleware** → Auth, RBAC, error handling

---

## 🔐 Security Features

- Password hashing using bcrypt
- JWT expiration & validation
- Refresh token revocation (logout support)
- Rate limiting (100 req / 15 min)
- Secure headers via Helmet
- CORS protection

---

## 📦 Tech Stack

- Node.js
- Express.js
- MySQL (Railway)
- bcryptjs
- jsonwebtoken
- Swagger UI
- Docker

---

## 🔌 API Endpoints

### Authentication

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`

### Protected

- `GET /api/v1/auth/user/profile`

Requires:

```
Authorization: Bearer <access_token>
```

---

## 🧠 Key Design Decisions

- **JWT Authentication** → scalable & stateless
- **Refresh Tokens in DB** → secure session control & revocation
- **Layered Architecture** → maintainable & testable
- **Middleware-driven flow** → clean separation of concerns

---

## 🚀 Deployment

- **Backend** → Render
- **Database** → Railway (MySQL)

---

## 📁 Project Structure

```
src/
├── config/
├── middleware/
├── models/
├── auth/
├── utils/
├── app.js
└── server.js
```

---

## 📌 Summary

This project reflects a **production-style backend system** with:

- Secure authentication architecture
- Clean code organization
- Real-world deployment setup
- Scalable and maintainable design

---

## 📜 License

For educational and demonstration purposes.
