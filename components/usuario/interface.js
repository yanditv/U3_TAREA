const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const routes = express.Router();

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Inserta un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario insertado con éxito
 *       400:
 *         description: Datos incompletos
 */
routes.post('/', function(req, res) {
    controller.insertar_usuario(req.body)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Obtiene los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       400:
 *         description: Error al obtener usuarios
 */
routes.get('/', function(req, res) {
    controller.obtener_usuario(req.body)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400));
});

/**
 * @swagger
 * /usuario:
 *   put:
 *     summary: Actualiza un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Datos incompletos
 */
routes.put('/', function(req, res) {
    controller.actualizar_usuario(req.body)
        .then(data => response.success(req, res, data, 200))
        .catch(error => response.error(req, res, error, 400));
});

/**
 * @swagger
 * /usuario:
 *   delete:
 *     summary: Elimina un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       400:
 *         description: Falta el ID para eliminar
 */
routes.delete('/', function(req, res) {
    controller.eliminar_usuario(req.body)
        .then(data => response.success(req, res, data, 200))
        .catch(error => response.error(req, res, error, 400));
});

module.exports = routes;
