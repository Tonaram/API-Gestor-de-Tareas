// src\routes\projectRoutes.js
const express = require("express");
const controller = require("./../controllers/projectController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Project:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: the project's name
 *        descripcion:
 *          type: string
 *          description: the project's descripcion
 *        fechaInicio:
 *          type: date
 *          description: the project's start date
 *        fechaFin:
 *          type: date
 *          description: the project's end date
 *        estado:
 *          type: string
 *          description: the project's state
 *        miembros:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/User'
 *          description: the members associated with the project
 *          minItems: 1
 *        tareas:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Task'
 *          description: the tasks associated with the project
 *          default: []
 *      required:
 *        - nombre
 *        - descripcion
 *        - fechaInicio
 *        - fechaFin
 *        - estado
 *        - miembros
 *      example:
 *        nombre: Mi Proyecto
 *        descripcion: Esta es una descripcion de mi proyecto
 *        fechaInicio: 2022-04-01
 *        fechaFin: 2022-09-30
 *        estado: activo
 *        miembros: ["641e52050440dacb69e85455"]
 *        tareas: []
 */


/**
 * @swagger
 * /api/projects:
 *  post:
 *    summary: creates a new project
 *    tags: [Project]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Project'
 *    responses:
 *      200:
 *        description: new project created
 */
router.post('/projects', authMiddleware, controller.create);

/**
 * @swagger
 * /api/projects:
 *  get:
 *    summary: returns all projects
 *    tags: [Project]
 *    responses:
 *      200:
 *        description: all projects returned
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Project'
 * 
 */
router.get('/projects', authMiddleware, controller.getAll);

/**
 * @swagger
 * /api/projects/{id}:
 *  get:
 *    summary: returns a project
 *    tags: [Project]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string 
 *        required: true
 *        description: the project's id
 *    responses:
 *      200:
 *        description: project returned
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Project'
 *      404:
 *        description: couldn't find project
 */
router.get('/projects/:id', authMiddleware, controller.getOne);

/**
 * @swagger
 * /api/projects/{id}:
 *  put:
 *    summary: updates a project
 *    tags: [Project]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string 
 *        required: true
 *        description: the project's id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Project'
 *    responses:
 *      200:
 *        description: project updated
 *      404:
 *        description: couldn't find project
 */
router.put('/projects/:id', authMiddleware, controller.update);

/**
 * @swagger
 * /api/projects/{id}:
 *  delete:
 *    summary: deletes a project
 *    tags: [Project]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string 
 *        required: true
 *        description: the project's id
 *    responses:
 *      200:
 *        description: project deleted
 *      404:
 *        description: couldn't find project
 */
router.delete("/projects/:id", authMiddleware, controller.delete);

module.exports = router;