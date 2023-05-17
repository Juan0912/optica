'use strict'

// Se declaran variables de controlador.
const cliente = require("../models/cliente");
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');
const moment = require('moment-timezone');


// ========================================================== MÉTODOS CONTROLADOR ====================================================

const registroCliente = async (req, res) => {

    // Se procesa la data.
    const data = req.body;
    let listadoClientes = [];

    // Se valida existencia del usuario.
    listadoClientes = await cliente.find({ identificacion: data.identificacion });

    if (listadoClientes.length === 0) {

        // Se registra el cliente
        data.nombres = data.nombres.toUpperCase();
        data.apellidos = data.apellidos.toUpperCase();
        const reg = await cliente.create(data);
        res.status(200).send({
            datos: true,
            resultadoExitoso: true,
            mensaje: 'Operación existosa!'
        });

    } else res.status(200).send({ datos: null, resultadoExitoso: false, mensaje: 'El usuario ya existe en la base de datos.' })
}

const obtenerCliente = async (req, res) => {

    const idCliente = req.params.id;

    try {
        let clienteEncontrado = await cliente.findById({ _id: idCliente });

        res.status(200).send({
            datos: clienteEncontrado,
            resultadoExitoso: true,
            mensaje: 'Operación existosa!'
        });
    } catch {
        res.status(200).send({ datos: null, resultadoExitoso: false, mensaje: 'El cliente no existe.' })
    }
}

const obtenerClientesALlamar = async (req, res) => {


    try {
        let dias = req.query.dias;
        let clienteEncontrado = await cliente.find();
        let clientesALlamar = [];

        clienteEncontrado.map((clienteItem) => {
            if (clienteItem.historiaClinica.length > 0) {
                if(dias == 365){
                    if(clienteItem.historiaClinica[0].control == 'UN AÑO') {
                        const fecha1 = moment(clienteItem.historiaClinica[0].createdAt).add(365,'days');
                        const fecha2 = moment().tz('America/Bogota');
                        const diferenciaEnDias = fecha1.diff(fecha2, 'days');
                        if (diferenciaEnDias >= 335 && diferenciaEnDias <= 350) clientesALlamar.push(clienteItem);
                    }
                }else if(dias == 180) {
                    if(clienteItem.historiaClinica[0].control == '6 MESES') {
                        const fecha1 = moment(clienteItem.historiaClinica[0].createdAt).add(180,'days');
                        const fecha2 = moment().tz('America/Bogota');
                        const diferenciaEnDias = fecha1.diff(fecha2, 'days');
                        if (diferenciaEnDias >= 90 && diferenciaEnDias <= 165) clientesALlamar.push(clienteItem);
                    }
                }
                else if(dias == 90) {
                    if(clienteItem.historiaClinica[0].control == '3 MESES') {
                        const fecha1 = moment(clienteItem.historiaClinica[0].createdAt).add(90,'days');
                        const fecha2 = moment().tz('America/Bogota');
                        const diferenciaEnDias = fecha1.diff(fecha2, 'days');
                        if (diferenciaEnDias >= 60 && diferenciaEnDias <= 75) clientesALlamar.push(clienteItem);
                    }
                }
                else if(dias == 60) {
                    if(clienteItem.historiaClinica[0].control == '2 MESES') {
                        const fecha1 = moment(clienteItem.historiaClinica[0].createdAt).add(60,'days');
                        const fecha2 = moment().tz('America/Bogota');
                        const diferenciaEnDias = fecha1.diff(fecha2, 'days');
                        if (diferenciaEnDias >= 30 && diferenciaEnDias <= 45) clientesALlamar.push(clienteItem);
                    }
                }
                else if(dias == 30) {
                    if(clienteItem.historiaClinica[0].control == '1 MES') {
                        const fecha1 = moment(clienteItem.historiaClinica[0].createdAt).add(30,'days');
                        const fecha2 = moment().tz('America/Bogota');
                        const diferenciaEnDias = fecha1.diff(fecha2, 'days');
                        if (diferenciaEnDias >= 0 && diferenciaEnDias <= 15) clientesALlamar.push(clienteItem);
                    }
                }
                else if(dias == 7) {
                    if(clienteItem.historiaClinica[0].control == '1 SEMANA') {
                        const fecha1 = moment(clienteItem.historiaClinica[0].createdAt).add(7,'days');
                        const fecha2 = moment().tz('America/Bogota');
                        const diferenciaEnDias = fecha1.diff(fecha2, 'days');
                        if (diferenciaEnDias >= 0 && diferenciaEnDias <= 7) clientesALlamar.push(clienteItem);
                    }
                }


                
                
                // else if(dias == 30){
                //     if (diferenciaEnDias >= 15 && diferenciaEnDias <= 30) clientesALlamar.push(clienteItem);
                // }
                // else if(dias == 7){
                //     if (diferenciaEnDias >= 1 && diferenciaEnDias <= 7) clientesALlamar.push(clienteItem);
                // }
                // else if(dias == 0){
                //     if (diferenciaEnDias == 0) clientesALlamar.push(clienteItem);
                // }
            }
        })


        res.status(200).send({
            datos: clientesALlamar,
            resultadoExitoso: true,
            mensaje: 'Operación existosa!'
        });
    } catch {
        res.status(200).send({ datos: null, resultadoExitoso: false, mensaje: 'Problema al buscar clientes.' })
    }
}

const actualizarCliente = async (req, res) => {

    // Se procesa la data.
    const data = req.body;
    const idCliente = req.params.id;

    // Se valida existencia del usuario.
    let elementoActualizado = await cliente.findOneAndUpdate({ _id: idCliente }, {
        nombres: data.nombres.toUpperCase(),
        apellidos: data.apellidos.toUpperCase(),
        telefono: data.telefono,
        genero: data.genero,
        fNacimiento: data.fNacimiento,
        identificacion: data.identificacion,
        tipoDocumento: data.tipoDocumento,
        historiaClinica: data.historiaClinica,
        correo: data.correo
    });

    res.status(200).send({
        datos: elementoActualizado,
        resultadoExitoso: true,
        mensaje: 'Operación existosa!'
    });

}

const loginCliente = async (req, res) => {

    // Se procesa la data.
    const data = req.body;
    let listadoClientes = [];

    // Se valida existencia del usuario.
    listadoClientes = await cliente.find({ email: data.email });

    // Se valida que exista el correo.
    if (listadoClientes.length === 0) res.status(200).send({ datos: null, resultadoExitoso: false, mensaje: 'El correo no existe en la base de datos.' });
    else {
        // Se declara el cliente seleccionado.
        const usuario = listadoClientes[0];

        // Se comparan las contraseñas.
        bcrypt.compare(data.password, usuario.password, async function (error, check) {
            if (check) {
                res.status(200).send({
                    datos: usuario,
                    token: jwt.createToken(usuario),
                    resultadoExitoso: true,
                    mensaje: 'Operación existosa!'
                });
            } else res.status(200).send({ datos: null, resultadoExitoso: false, mensaje: 'Credenciales de acceso no coinciden.' });
        });
    }
}

const listarClientes = async (req, res) => {

    if (req.user) {
        if (req.user.rol === 'Administrador' || req.user.rol === 'Auxiliar') {
            // Se declaran variables
            let listadoClientes = [];
            // Se valida existencia del usuario.
            listadoClientes = await cliente.find().sort({ createdAt: -1 });

            res.status(200).send({
                datos: listadoClientes,
                resultadoExitoso: true,
                mensaje: 'Operación existosa!'
            });

        } else res.status(500).send({ datos: null, resultadoExitoso: false, mensaje: 'No access.' });
    } else res.status(500).send({ datos: null, resultadoExitoso: false, mensaje: 'No access.' });

}

const eliminarCliente = async (req, res) => {

    const idCliente = req.params.id;


    const clienteEliminado = await cliente.findByIdAndRemove({ _id: idCliente });

    res.status(200).send({
        datos: clienteEliminado,
        resultadoExitoso: true,
        mensaje: 'Operación existosa!'
    });

}

const actualizarLlamadoCliente = async (req, res) => {

    const idCliente = req.params.id;


    const clienteEncontrado = await cliente.findById({ _id: idCliente });

    const clienteActualizado = await cliente.findOneAndUpdate({ _id: idCliente }, {
        llamado: !clienteEncontrado.llamado
    });


    res.status(200).send({
        datos: clienteActualizado,
        resultadoExitoso: true,
        mensaje: 'Operación existosa!'
    });

}






// Se exportan todas las funcionalidades.
module.exports = {
    registroCliente,
    loginCliente,
    listarClientes,
    actualizarCliente,
    eliminarCliente,
    obtenerCliente,
    obtenerClientesALlamar,
    actualizarLlamadoCliente

}