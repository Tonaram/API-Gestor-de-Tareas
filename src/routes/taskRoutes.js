const express = require("express");
const controller = require("./../controllers/taskController");

const router = express.Router();


/**
 * @swagger
 * components:
 *  schemas:
 *    Task:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: the task's name
 *        descripcion:
 *          type: string
 *          description: the task's descripcion
 *        fechaInicio:
 *          type: date
 *          description: the task's start date
 *        fechaFin:
 *          type: date
 *          description: the task's end date
 *        estado:
 *          type: string
 *          description: the task's state
 *        asignadoA:
 *          type: objectid
 *          description: the task's assigned user
 *        proyecto:
 *          type: objectid
 *          description: the task's assigned project
 *      required:
 *        - nombre
 *        - descripcion
 *        - fechaInicio
 *        - fechaFin
 *        - estado
 *        - asignadoA
 *        - proyecto
 *      example:
 *        nombre: Mi Tarea
 *        descripcion: Esta es una descripcion de mi tarea
 *        fechaInicio: 2022-04-02
 *        fechaFin: 2022-08-30
 *        estado: activa
 *        asignadoA: 61f3d6200f9d2c6d873c95c0
 *        proyecto: 61f3d6200f9d2c6d873c95c1
 */


/**
 * @swagger
 * /api/tasks:
 *  post:
 *    summary: creates a new task
 *    tags: [Task]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: new task created
 */
router.post('/tasks', controller.create);

/**
 * @swagger
 * /api/tasks:
 *  get:
 *    summary: returns all tasks
 *    tags: [Task]
 *    responses:
 *      200:
 *        description: all tasks returned
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Task'
 * 
 */
router.get('/tasks', controller.getAll);

/**
 * @swagger
 * /api/tasks/{id}:
 *  get:
 *    summary: returns a task
 *    tags: [Task]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string 
 *        required: true
 *        description: the task's id
 *    responses:
 *      200:
 *        description: task returned
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Task'
 *      404:
 *        description: couldn't find task
 */
router.get('/tasks/:id', controller.getOne);

/**
 * @swagger
 * /api/tasks/{id}:
 *  put:
 *    summary: updates a task
 *    tags: [Task]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string 
 *        required: true
 *        description: the task's id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: task updated
 *      404:
 *        description: couldn't find task
 */
router.put('/tasks/:id', controller.update);

/**
 * @swagger
 * /api/tasks/{id}:
 *  delete:
 *    summary: deletes a task
 *    tags: [Task]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string 
 *        required: true
 *        description: the task's id
 *    responses:
 *      200:
 *        description: task deleted
 *      404:
 *        description: couldn't find task
 */
router.delete("/tasks/:id", controller.delete);

module.exports = router;