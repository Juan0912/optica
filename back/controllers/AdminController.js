'use strict'

// Se declaran variables de controlador.
const admin = require("../models/admin");
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');


// ========================================================== MÉTODOS CONTROLADOR ====================================================

// Método para registrar un admin.
const registroAdmin = async (req, res) => {
    // Se procesa la data.
    const data = req.body;
    let listadoClientes = [];

    // Se valida existencia del usuario.
    listadoClientes = await admin.find({ email: data.email });

    if (listadoClientes.length === 0) {
        if (data.password) {
            bcrypt.hash(data.password, null, null, async function (err, hash) {
                if (hash) {
                    // Se registra el cliente
                    data.password = hash;
                    const reg = await admin.create(data);
                    res.status(200).send({
                        datos: true,
                        resultadoExitoso: true,
                        mensaje: 'Operación existosa!'
                    });
                } else res.status(200).send({ datos: null, resultadoExitoso: false, mensaje: 'Error server.' })
            });
        } else res.status(200).send({ datos: null, resultadoExitoso: false, mensaje: 'No hay una contraseña.' })


    } else res.status(200).send({ datos: null, resultadoExitoso: false, mensaje: 'El correo ya existe en la base de datos.' })
}

// Método para ingresar al sistema.
const loginAdmin = async (req, res) => {

    // Se procesa la data.
    const data = req.body;
    let listadoAdmin = [];

    // Se valida existencia del usuario.
    listadoAdmin = await admin.find({ email: data.email });

    console.log(data)

    // Se valida que exista el correo.
    if (listadoAdmin.length === 0) res.status(200).send({ datos: null, resultadoExitoso: false, mensaje: 'El correo no existe en la base de datos.' });
    else {
        // Se declara el admin seleccionado.
        const usuario = listadoAdmin[0];

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



// Se exportan todas las funcionalidades.
module.exports = {
    registroAdmin,
    loginAdmin,
}