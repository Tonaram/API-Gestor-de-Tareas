const express = require("express");
const controller = require("./../controllers/userController");

const router = express.Router();


/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: the user's name
 *        email:
 *          type: string
 *          description: the user's email
 *        contraseña:
 *          type: string
 *          description: the user's password
 *        imagen:
 *          type: string
 *          description: the user's profile image
 *        proyectos:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Project'
 *          description: the projects associated with the user
 *          default: []
 *        tareas:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Task'
 *          description: the tasks associated with the user
 *          default: []
 *      required:
 *        - nombre
 *        - email
 *        - contraseña
 *        - imagen
 *      example:
 *        nombre: JuanVT
 *        email: juan@gmail.com
 *        contraseña: juan123
 *        imagen: https://ejemplo.com/imagen.jpg
 *        proyectos: []
 *        tareas: []
 */


/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: creates a new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: new user created
 */
router.post('/users', controller.create);

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: returns all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: all users returned
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 * 
 */
router.get('/users', controller.getAll);

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: returns a user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string 
 *        required: true
 *        description: the user's id
 *    responses:
 *      200:
 *        description: user returned
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: couldn't find user
 */
router.get('/users/:id', controller.getOne);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: updates a user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string 
 *        required: true
 *        description: the user's id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: user updated
 *      404:
 *        description: couldn't find user
 */
router.put('/users/:id', controller.update);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: deletes a user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string 
 *        required: true
 *        description: the user's id
 *    responses:
 *      200:
 *        description: user deleted
 *      404:
 *        description: couldn't find user
 */
router.delete("/users/:id", controller.delete);

module.exports = router;