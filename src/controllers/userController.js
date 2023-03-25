const userSchema = require('./../models/user');

const UsersController = {
    create: (req, res) => {
        const user = userSchema(req.body);
        user.save().then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    },
    getAll: (req, res) => {
        userSchema.find().then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    },
    getOne: (req, res) => {
        const { id } = req.params;
        userSchema.findById(id).then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    },
    update: (req, res) => {
        const { id } = req.params;
        const { nombre, email, contraseña, imagen, proyectos, tareas } = req.body;
        userSchema.updateOne({ _id: id}, { $set: {nombre, email, contraseña, imagen, proyectos, tareas} }).then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    },
    delete: (req, res) => {
        const { id } = req.params;
        userSchema.deleteOne({ _id: id }).then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
    }
}

module.exports = UsersController;