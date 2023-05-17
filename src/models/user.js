// src\models\user.js
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true},
    contraseña: {type: String},
    imagen: {type: String},
    proyectos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: [] }],
    tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: [] }],
    role: {type: String, required: true, enum: ['user', 'admin']},
    googleId: {type: String},
});

module.exports = mongoose.model('User', userSchema);