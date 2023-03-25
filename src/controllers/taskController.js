const taskSchema = require('./../models/task');

const TasksController = {
    create: (req, res) => {
        const task = taskSchema(req.body);
        task.save().then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    },
    getAll: (req, res) => {
        taskSchema.find().then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    },
    getOne: (req, res) => {
        const { id } = req.params;
        taskSchema.findById(id).then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    },
    update: (req, res) => {
        const { id } = req.params;
        const { nombre, descripcion, fechaInicio, fechaFin, estado, asignadoA, proyecto } = req.body;
        taskSchema.updateOne({ _id: id}, { $set: {nombre, descripcion, fechaInicio, fechaFin, estado, asignadoA, proyecto} }).then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    },
    delete: (req, res) => {
        const { id } = req.params;
        taskSchema.deleteOne({ _id: id }).then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    }
}

module.exports = TasksController;