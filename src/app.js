//  src\app.js

const express = require("express");
const userRoutes =require("./routes/user.routes");
const authRoutes = require("./auth/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const errorHandler = require("./middleware/error.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// 🔑 Load database connection
require("./config/db");

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use("/users", userRoutes)
app.use("/auth", authRoutes);
app.use(adminRoutes);
app.use(errorHandler);


module.exports = app;