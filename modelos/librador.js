"use strict"
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var LibradorSchema = Schema({
	dniCuit: String,
	nombre: String,
	apellido: String,
	telefono: Number,
	domicilio: String,
	ciudad: String

})

module.exports = mongoose.model("libradores", LibradorSchema)