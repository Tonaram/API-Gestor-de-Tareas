// src\models\project.js
const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    fechaInicio: {type: Date, required: true},
    fechaFin: {type: Date, required: true},
    estado: {type: String, required: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: [] }]
});

module.exports = mongoose.model('Project', projectSchema);