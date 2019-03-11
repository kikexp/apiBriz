"use strict"

var express = require("express");

var ControladorVehiculo = require("../controladores/vehiculoControlador.js");

var api = express.Router();
var md_aut = require("../seguridad/auth.js");

//Ruta POST Cliente

api.post("/altaVehiculo", md_aut.autenticacion, ControladorVehiculo.altaVehiculo);

api.get("/verVehiculos", md_aut.autenticacion, ControladorVehiculo.getVehiculos);

api.get("/verVehiculo/:id", md_aut.autenticacion, ControladorVehiculo.getVehiculo);

api.put("/actualizarVehiculo/:id", md_aut.autenticacion, ControladorVehiculo.putVehiculo);

module.exports = api;