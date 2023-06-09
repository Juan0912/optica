'use strict'

// Variables de inicio.
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV || 'development'}`
});
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

// Se establece puerto del servidor.
const port = process.env.PORT || 4201;
const url_bd = process.env.BD_URL || 'mongodb://127.0.0.1:27017/optica';
const { CONSTANTS } = require('./config/constants');



// ============================================================== RUTAS ===================================================
const adminRoutes = require('./routes/admin');
const clienteRoutes = require('./routes/cliente');
const citaRoutes = require('./routes/cita');



// Se inicializa la app.
const app = express();

app.use(express.static(__dirname + '/static'));


// ========================================================= SOCKET =========================================

// Se establece conexión a base de datos mongo.
mongoose.connect(CONSTANTS.bd, { useUnifiedTopology: true, useNewUrlParser: true }, (err, res) => {
    if (err) console.log(err);
    else {
        app.listen(port, () => {
            console.log("############################################################");
            console.log(`### SERVIDOR CORRIENDO CORRACTAMENTE EN EL PUERTO: ${port}. ###`);
            console.log("############################################################");
        });
    }
});


// Se realizan configuraciones para parsear información json.
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ extended: true, limit: '50mb' }));


// Configuración de cors.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});


// Configuración de rutas.
app.use('/api', adminRoutes);
app.use('/api', clienteRoutes);
app.use('/api', citaRoutes);
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
  });
// "start": "nodemon npm app.js",



// Se exporta el aplicativo
module.exports = app;