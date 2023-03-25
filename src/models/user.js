const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true},
    contraseña: {type: String, required: true},
    imagen: {type: String, required: true},
    proyectos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: [] }],
    tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: [] }]
});

module.exports = mongoose.model('User', userSchema);