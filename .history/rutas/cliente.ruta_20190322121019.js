"use strict"

var express = require("express");

var ControladorCliente = require("../controladores/clienteControlador.js");

var api = express.Router();

var md_aut = require("../seguridad/auth.js");

//Ruta POST Cliente

api.post("/altaCliente", md_aut.autenticacion, ControladorCliente.altaCliente);

api.get("/verClientes", md_aut.autenticacion, ControladorCliente.getClientes);

api.get("/verClienteDni/:id", md_aut.autenticacion, ControladorCliente.getClienteDni);

api.get("/verCliente/:id", md_aut.autenticacion, ControladorCliente.getCliente);

api.put("/actualizarCliente/:id", md_aut.autenticacion, ControladorCliente.putCliente);

module.exports = api;