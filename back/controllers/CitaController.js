'use strict'

// Se declaran variables de controlador.
const cita = require("../models/cita");
const jwt = require('../helpers/jwt');


// ========================================================== MÉTODOS CONTROLADOR ====================================================

const crearCita = async (req, res) => {

    const data = req.body;
    try {
        let citaCreada = await cita.create(data);

        res.status(200).send({
            datos: citaCreada,
            resultadoExitoso: true,
            mensaje: 'Operación existosa!'
        });
    } catch (error) {
        res.status(200).send({
            datos: null,
            resultadoExitoso: false,
            mensaje: 'Problemas al registrar la cita.'
        });


    }
}

const obtenerCita = async (req, res) => {

    const idCita = req.params.id;

    try {
        let citaEncontrada = await cita.findById({ _id: idCita });

        res.status(200).send({
            datos: citaEncontrada,
            resultadoExitoso: true,
            mensaje: 'Operación existosa!'
        });
    } catch {
        res.status(200).send({ datos: null, resultadoExitoso: false, mensaje: 'La cita no existe.' })
    }
}

const actualizarCita = async (req, res) => {

    // Se procesa la data.
    const data = req.body;
    const idCita = req.params.id;

    // Se valida existencia del usuario.
    let elementoActualizado = await cita.findOneAndUpdate({ _id: idCita }, {
        fecha: data.fecha,
        hora: data.hora,
        cliente: data.cliente
    });

    res.status(200).send({
        datos: elementoActualizado,
        resultadoExitoso: true,
        mensaje: 'Operación existosa!'
    });

}

const listarCitas = async (req, res) => {

    let listadoCitas = await cita.find().sort({ createdAt: -1 });

    res.status(200).send({
        datos: listadoCitas,
        resultadoExitoso: true,
        mensaje: 'Operación existosa!'
    });


}

const listarCitasDia = async (req, res) => {

    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);

    const filtroBusqueda = {
        fecha: {
            $gte: fechaHoy,
            $lt: new Date(fechaHoy.getTime() + 24 * 60 * 60 * 1000),
        },
    };

    let listadoCitas = await cita.find(filtroBusqueda);

    res.status(200).send({
        datos: listadoCitas,
        resultadoExitoso: true,
        mensaje: 'Operación existosa!'
    });


}

const listarCitasPorFecha = async (req, res) => {

    let fecha = req.body.fecha
    const fechaCita = new Date(fecha);
    fechaCita.setHours(0, 0, 0, 0);

    const filtroBusqueda = {
        fecha: {
            $gte: fechaCita,
            $lt: new Date(fechaCita.getTime() + 24 * 60 * 60 * 1000),
        },
    };

    let listadoCitas = await cita.find(filtroBusqueda);

    res.status(200).send({
        datos: listadoCitas,
        resultadoExitoso: true,
        mensaje: 'Operación existosa!'
    });


}

const eliminarCita = async (req, res) => {

    const idCita = req.params.id;


    const citaEliminada = await cita.findByIdAndRemove({ _id: idCita });

    res.status(200).send({
        datos: citaEliminada,
        resultadoExitoso: true,
        mensaje: 'Operación existosa!'
    });

}






// Se exportan todas las funcionalidades.
module.exports = {
    crearCita,
    obtenerCita,
    actualizarCita,
    listarCitas,
    eliminarCita,
    listarCitasDia,
    listarCitasPorFecha

}