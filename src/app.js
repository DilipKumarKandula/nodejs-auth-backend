// src/app.js

const express = require("express");

// 🔐 Security & Production Middleware
const helmet = require("helmet"); // protects HTTP headers
const cors = require("cors"); // controls who can access API
const rateLimit = require("express-rate-limit"); // prevents abuse/spam

// 📦 Routes
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./auth/auth.routes");
const adminRoutes = require("./routes/admin.routes");

// ❌ Error handler (must be last)
const errorHandler = require("./middleware/error.middleware");

// 📄 Swagger (API documentation)
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// 🔑 Load DB connection
require("./config/db");

const app = express();


// ========================
// 🔐 1. SECURITY LAYER
// ========================

// 🛡️ Helmet → Secures HTTP headers
// Example: prevents XSS, clickjacking, etc.
app.use(helmet());

// 🌍 CORS → Controls which frontend can call your API
app.use(cors({
  origin: "*", // ⚠️ In production → replace with frontend URL
}));

// 🚫 Rate Limiting → Prevents API abuse (DDOS/basic spam)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // max 100 requests per IP
  message: "Too many requests, try again later"
});
app.use(limiter);


// ========================
// 📄 2. API DOCUMENTATION
// ========================

// Swagger UI → Test APIs without frontend
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ========================
// 📦 3. BODY PARSER
// ========================

// Allows reading JSON from request body
app.use(express.json());


// ========================
// 🚀 4. API ROUTES (VERSIONED)
// ========================

// Industry standard → version your APIs
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);


// ========================
// ❌ 5. ERROR HANDLER
// ========================

// MUST be last middleware
// Handles all errors from controllers/services
app.use(errorHandler);


module.exports = app;