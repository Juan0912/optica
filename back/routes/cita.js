'use strict'

// Se declaran modulos.
const express = require('express');
const citaController = require('../controllers/CitaController');

// Se establece el router.
const api = express.Router();
const auth = require('../middlewares/authenticate');

// Ruta para el registro de citas.
api.post('/crearCita', citaController.crearCita);
// Ruta para actualizar una cita.
api.put('/actualizarCita/:id', auth.auth, citaController.actualizarCita);
// Ruta para obtener todas las citas
api.get('/listarCitas', auth.auth, citaController.listarCitas);
// Ruta para obtener una cita por su id.
api.get('/obtenerCita/:id', auth.auth, citaController.obtenerCita);
// Ruta para obtener todas las citas del dia actual.
api.get('/listarCitasDia', auth.auth, citaController.listarCitasDia);
// Ruta para obtener todas las citas de una fecha en especifico.
api.post('/listarCitasPorFecha', auth.auth, citaController.listarCitasPorFecha);
// Ruta para eliminar una cita.
api.delete('/eliminarCita/:id', citaController.eliminarCita);
// Ruta para actualizar estado consulta realziada.
api.get('/actualizarConsultaRealizada/:id', auth.auth, citaController.actualizarConsultaRealizada);








// Se exporta modulo.
module.exports = api;