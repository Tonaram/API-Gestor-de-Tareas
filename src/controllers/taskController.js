// src\controllers\taskController.js
const taskSchema = require('./../models/task');

const TasksController = {
    create: (req, res) => {
        const task = new taskSchema({
            ...req.body,
            asignadoA: req.user._id 
        });
        task.save().then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    },
    getAll: (req, res) => {
        if (req.user.role === 'admin') {
            taskSchema.find().then((data) => res.json(data))
            .catch((error) => res.json({message: error}));
        } else {
            taskSchema.find({ asignadoA: req.user._id }).then((data) => res.json(data))
            .catch((error) => res.json({message: error}));
        }
    },
    getOne: (req, res) => {
        const { id } = req.params;
        taskSchema.findById(id).then((data) => {
            if (req.user.role !== 'admin' && req.user._id.toString() !== data.asignadoA.toString()) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            res.json(data);
        }).catch((error) => res.json({message: error}));
    },
    update: (req, res) => {
        const { id } = req.params;
        taskSchema.findById(id).then((data) => {
            if (req.user.role !== 'admin' && req.user._id.toString() !== data.asignadoA.toString()) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            const { nombre, descripcion, fechaInicio, fechaFin, estado, proyecto } = req.body;
            return taskSchema.updateOne({ _id: id}, { $set: {nombre, descripcion, fechaInicio, fechaFin, estado, proyecto} })
        }).then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    },
    delete: (req, res) => {
        const { id } = req.params;
        taskSchema.findById(id).then((data) => {
            if (req.user.role !== 'admin' && req.user._id.toString() !== data.asignadoA.toString()) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            return taskSchema.deleteOne({ _id: id })
        }).then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    }
}

module.exports = TasksController;