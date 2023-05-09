'use strict'

// Se declaran modulos.
const express = require('express');
const clienteController = require('../controllers/ClienteController');

// Se establece el router.
const api = express.Router();
const auth = require('../middlewares/authenticate');

// Ruta para el registro de clientes.
api.post('/registro', clienteController.registroCliente);
// Ruta para el inicio de sesion de clientes.
api.post('/loginCliente', clienteController.loginCliente);
// Ruta para el listado de clientes.
api.get('/listarClientes', auth.auth, clienteController.listarClientes);
api.get('/obtenerCliente/:id', auth.auth, clienteController.obtenerCliente);
// Ruta para la actualizacion de clientes.
api.post('/actualizarCliente/:id', clienteController.actualizarCliente);
// Ruta para la actualizacion de clientes.
api.delete('/eliminarCliente/:id', clienteController.eliminarCliente);






// Se exporta modulo.
module.exports = api;