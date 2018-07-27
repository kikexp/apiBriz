"use strict"

var express = require("express");

var ControladorContrato = require("../controladores/contratoControlador.js");

var api = express.Router();
var md_aut = require("../seguridad/auth.js");

//Ruta POST Cliente

api.post("/altaContrato",md_aut.autenticacion, ControladorContrato.altaContrato);

api.get("/verContratos",md_aut.autenticacion, ControladorContrato.getContratos);

api.get("/verContrato/:id",md_aut.autenticacion, ControladorContrato.getContratos);

api.put("/actualizarContrato/:id",md_aut.autenticacion, ControladorContrato.putContrato);

module.exports = api;