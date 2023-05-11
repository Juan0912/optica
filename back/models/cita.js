'use strict'

// Se declaran modulos.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creación del modelo en base de datos para los clientes.
const CitaSchema = Schema({
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
    cliente: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
});

// Se exporta modulo.
module.exports = mongoose.model('cita', CitaSchema);