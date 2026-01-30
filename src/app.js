const express = require("express");
const userRoutes =require("./routes/user.routes");
const authRoutes = require("./auth/auth.routes");
const adminRoutes = require("./routes/admin.routes");

// 🔑 Load database connection
require("./config/db");

const app = express();

app.use(express.json());

app.use("/users", userRoutes)

app.use("/auth", authRoutes);

app.use(adminRoutes);
module.exports = app;