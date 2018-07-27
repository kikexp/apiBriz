'use strict';

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());

// CARGAR Rutas

var rutaClientes = require("./rutas/cliente.ruta.js");
var rutaVehiculos = require("./rutas/vehiculo.ruta.js");
var rutaUsuarios = require("./rutas/usuario.ruta.js");
var rutaCheques = require("./rutas/cheque.ruta.js");
var rutaLibradors = require("./rutas/librador.ruta.js");
var rutaContratos = require("./rutas/contrato.ruta.js");
// Configuramos las cabeceras HTTP para permitir el acceso de aplicaciones externas a los datos JSON 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Allow", "GET, POST, PUT, DELETE");
  next();
});


app.use("/api", rutaClientes);
app.use("/api", rutaVehiculos);
app.use("/api", rutaUsuarios);
app.use("/api", rutaCheques);
app.use("/api", rutaLibradors);
app.use("/api", rutaContratos);
module.exports = app;