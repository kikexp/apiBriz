"use strict"

var express = require("express");

var Controladorlibrador = require("../controladores/libradorControlador.js");

var api = express.Router();

var md_aut = require("../seguridad/auth.js");

//Ruta Librador

api.post("/altalibrador",md_aut.autenticacion, Controladorlibrador.altaLibrador);

api.get("/verlibradors",md_aut.autenticacion, Controladorlibrador.getLibradors);

api.get("/verlibrador/:id",md_aut.autenticacion, Controladorlibrador.getLibradors);

api.put("/actualizarlibrador/:id",md_aut.autenticacion, Controladorlibrador.putLibrador);

module.exports = api;