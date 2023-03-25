const projectSchema = require('./../models/project');

const ProjectsController = {
    create: (req, res) => {
        const project = projectSchema(req.body);
        project.save().then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    },
    getAll: (req, res) => {
        projectSchema.find().then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    },
    getOne: (req, res) => {
        const { id } = req.params;
        projectSchema.findById(id).then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    },
    update: (req, res) => {
        const { id } = req.params;
        const { nombre, descripcion, fechaInicio, fechaFin, estado, miembros, tareas } = req.body;
        projectSchema.updateOne({ _id: id}, { $set: {nombre, descripcion, fechaInicio, fechaFin, estado, miembros, tareas} }).then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    },
    delete: (req, res) => {
        const { id } = req.params;
        projectSchema.deleteOne({ _id: id }).then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    }
}

module.exports = ProjectsController;