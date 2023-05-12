'use strict'

// Se declaran variables de controlador.
const cita = require("../models/cita");
const jwt = require('../helpers/jwt');
const moment = require('moment-timezone');


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
        nombres: data.nombres,
        apellidos: data.apellidos,
        correo: data.correo,
        telefono: data.telefono,
        fecha: data.fecha,
        hora: data.hora
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

    const fechaHoy = moment().tz('America/Bogota').format('YYYY-MM-DD');

    const filtroBusqueda = {
        fecha: fechaHoy,
    };

    let listadoCitas = await cita.find(filtroBusqueda);

    res.status(200).send({
        datos: listadoCitas,
        resultadoExitoso: true,
        mensaje: 'Operación existosa!'
    });


}

const listarCitasPorFecha = async (req, res) => {

    let fechaTmp = req.body.fecha
    const fechaCita = moment(fechaTmp).tz('America/Bogota').format('YYYY-MM-DD');;

    const filtroBusqueda = {
        fecha: fechaCita
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

const actualizarConsultaRealizada = async (req, res) => {

    const idCita = req.params.id;

    const citaEncontrada = await cita.findById({ _id: idCita });

    const citaActualizada = await cita.findOneAndUpdate({ _id: idCita }, {
        realizada: !citaEncontrada.realizada
    });


    res.status(200).send({
        datos: citaActualizada,
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
    listarCitasPorFecha,
    actualizarConsultaRealizada
}