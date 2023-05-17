// src\controllers\projectController.js
const projectSchema = require('./../models/project');

const ProjectsController = {
    create: (req, res) => {
        const project = new projectSchema({
            ...req.body,
            creator: req.user._id
        });
        project.save().then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    },
    getAll: (req, res) => {
        if (req.user.role === 'admin') {
            projectSchema.find().then((data) => res.json(data))
            .catch((error) => res.json({message: error}));
        } else {
            projectSchema.find({ creator: req.user._id }).then((data) => res.json(data))
            .catch((error) => res.json({message: error}));
        }
    },
    getOne: (req, res) => {
        const { id } = req.params;
        projectSchema.findById(id).then((data) => {
            if (req.user.role !== 'admin' && req.user._id.toString() !== data.creator.toString()) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            res.json(data);
        }).catch((error) => res.json({message: error}));
    },
    update: (req, res) => {
        const { id } = req.params;
        projectSchema.findById(id).then((data) => {
            if (req.user.role !== 'admin' && req.user._id.toString() !== data.creator.toString()) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            const { nombre, descripcion, fechaInicio, fechaFin, estado } = req.body;
            return projectSchema.updateOne({ _id: id}, { $set: {nombre, descripcion, fechaInicio, fechaFin, estado} })
        }).then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    },
    delete: (req, res) => {
        const { id } = req.params;
        projectSchema.findById(id).then((data) => {
            if (req.user.role !== 'admin' && req.user._id.toString() !== data.creator.toString()) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            return projectSchema.deleteOne({ _id: id })
        }).then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    }
}

module.exports = ProjectsController;