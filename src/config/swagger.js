const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js Auth Backend API",
      version: "1.0.0",
      description: "Authentication & Authorization API documentation"
    },
    servers: [
      {
        url: "https://auth-backend-hta6.onrender.com/api-docs/v1",
        description: "Local server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./src/**/*.js"] // scans route files
};

module.exports = swaggerJSDoc(options);
