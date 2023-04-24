const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const path = require("path");

// settings
const app = express();
const port = process.env.PORT || 3000;

// CORS
const cors = require('cors');
app.use(cors());

// swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node MongoDB API Gestor de Tareas",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:" + port
            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
}

// middleware
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", projectRoutes);
app.use("/api", taskRoutes);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

// routes
app.get("/", (req, res) => {
    res.send("API Gestor de Tareas");
});

// mongodb connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

app.listen(port, () => console.log("server listening on port", port));
