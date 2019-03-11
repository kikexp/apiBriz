"use strict"

var express = require("express");

var controladorUpload = require("../controladores/uploadControlador");

var api = express.Router();

var md_aut = require("../seguridad/auth.js");

api.post("/upload/:id/:tipo", controladorUpload.subirArchivo);

api.get('/download/:img', controladorUpload.descargarArchivo)
module.exports = api;