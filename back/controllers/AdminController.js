'use strict'

// Se declaran variables de controlador.
const admin = require("../models/admin");
const cliente = require("../models/cliente");
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');
const moment = require('moment-timezone')


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

const kpiConsultasPorMes = async (req, res) => {

    let kpi = {
        pasado: {
            enero: 0,
            febrero: 0,
            marzo: 0,
            abril: 0,
            mayo: 0,
            junio: 0,
            julio: 0,
            agosto: 0,
            septiembre: 0,
            octubre: 0,
            noviembre: 0,
            diciembre: 0
        },
        actual: {
            enero: 0,
            febrero: 0,
            marzo: 0,
            abril: 0,
            mayo: 0,
            junio: 0,
            julio: 0,
            agosto: 0,
            septiembre: 0,
            octubre: 0,
            noviembre: 0,
            diciembre: 0
        },
        consultasDia: 0,
        consultasMes: 0
    }

    const currentDate = new Date();
    const currentDateMes = currentDate.getMonth() + 1;
    const currentDateDay = moment().tz('America/Bogota').format("DD");
    const currentYear = currentDate.getFullYear();
    const passYear = currentDate.getFullYear() - 1;

    const clientes = await cliente.find();

    for (const clienteItem of clientes) {
        for (const historia of clienteItem.historiaClinica) {
            let createdAtDate = new Date(historia.createdAt);
            const mes = createdAtDate.getMonth() + 1;
            const day = moment(createdAtDate).format('DD');
            if (currentYear == createdAtDate.getFullYear()) {
                if (mes == 1) kpi.actual.enero++;
                if (mes == 2) kpi.actual.febrero++;
                if (mes == 3) kpi.actual.marzo++;
                if (mes == 4) kpi.actual.abril++;
                if (mes == 5) kpi.actual.mayo++;
                if (mes == 6) kpi.actual.junio++;
                if (mes == 7) kpi.actual.julio++;
                if (mes == 8) kpi.actual.agosto++;
                if (mes == 9) kpi.actual.septiembre++;
                if (mes == 10) kpi.actual.octubre++;
                if (mes == 11) kpi.actual.noviembre++;
                if (mes == 12) kpi.actual.diciembre ++;
            }
            if (passYear == createdAtDate.getFullYear() ) {
                if (mes == 1) kpi.pasado.enero++;
                if (mes == 2) kpi.pasado.febrero++;
                if (mes == 3) kpi.pasado.marzo++;
                if (mes == 4) kpi.pasado.abril++;
                if (mes == 5) kpi.pasado.mayo++;
                if (mes == 6) kpi.pasado.junio++;
                if (mes == 7) kpi.pasado.julio++;
                if (mes == 8) kpi.pasado.agosto++;
                if (mes == 9) kpi.pasado.septiembre++;
                if (mes == 10) kpi.pasado.octubre++;
                if (mes == 11) kpi.pasado.noviembre++;
                if (mes == 12) kpi.pasado.diciembre++;
            }

            if(mes == currentDateMes && currentYear == createdAtDate.getFullYear()) kpi.consultasMes++;
            if(day == currentDateDay && currentYear == createdAtDate.getFullYear() && mes == currentDateMes) kpi.consultasDia++;
        }
    }
    console.log(kpi);
    res.status(200).json({
        datos: {
           kpi
        },
        resultadoExitoso: true,
        mensaje: 'Operación existosa!'
    });



}



// Se exportan todas las funcionalidades.
module.exports = {
    registroAdmin,
    loginAdmin,
    kpiConsultasPorMes
}