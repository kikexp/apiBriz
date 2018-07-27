"use strict"

var express = require("express");

var ControladorCheque = require("../controladores/chequeControlador.js");

var api = express.Router();
var md_aut = require("../seguridad/auth.js");

//Ruta POST Cliente

api.post("/altaCheque",md_aut.autenticacion, ControladorCheque.altaCheque);

api.get("/verCheques",md_aut.autenticacion, ControladorCheque.getCheques);

api.get("/verCheque/:id",md_aut.autenticacion, ControladorCheque.getCheques);

api.put("/actualizarCheque/:id",md_aut.autenticacion, ControladorCheque.putCheque);

module.exports = api;