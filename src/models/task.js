const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    fechaInicio: {type: Date, required: true},
    fechaFin: {type: Date, required: true},
    estado: {type: String, required: true},
    asignadoA: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    proyecto: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true}
});

module.exports = mongoose.model('Task', taskSchema);