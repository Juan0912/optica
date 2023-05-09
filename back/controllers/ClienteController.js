'use strict'

// Se declaran variables de controlador.
const cliente = require("../models/cliente");
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');


// ========================================================== MÉTODOS CONTROLADOR ====================================================

const registroCliente = async (req, res) => {

    // Se procesa la data.
    const data = req.body;
    let listadoClientes = [];

    // Se valida existencia del usuario.
    listadoClientes = await cliente.find({ identificacion: data.identificacion });

    if (listadoClientes.length === 0) {

        // Se registra el cliente
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

const actualizarCliente = async (req, res) => {

    // Se procesa la data.
    const data = req.body;
    const idCliente = req.params.id;

    // Se valida existencia del usuario.
    let elementoActualizado = await cliente.findOneAndUpdate({ _id: idCliente }, {
        nombres: data.nombres,
        apellidos: data.apellidos,
        telefono: data.telefono,
        genero: data.genero,
        fNacimiento: data.fNacimiento,
        identificacion: data.identificacion,
        tipoDocumento: data.tipoDocumento,
        estadoCuenta: data.estadoCuenta,
        valorCuenta: data.valorCuenta,
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






// Se exportan todas las funcionalidades.
module.exports = {
    registroCliente,
    loginCliente,
    listarClientes,
    actualizarCliente,
    eliminarCliente,
    obtenerCliente

}