'use strict'

// Se declaran modulos.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creación del modelo en base de datos para los clientes.
const CitaSchema = Schema({
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true },
    fecha: { type: String, required: true },
    usuarioModifica: { type: String, required: false },
    usuarioCrea: { type: String, required: false },
    usuarioCambiaEstado: { type: String, required: false },
    modificado: { type: String, required: false },
    hora: { type: String, required: true },
    realizada: { type: Boolean, required: false, default: false },
    createdAt: { type: Date, required: true, default: Date.now },
});

// Se exporta modulo.
module.exports = mongoose.model('cita', CitaSchema);