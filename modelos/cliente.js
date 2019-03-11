"use strict"

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ClientesSchema = Schema({
    nombre: String,
    apellido: String,
    docTipo: String,
    dni: Number,
    telefono: Number,
    celular: Number,
    email: String,
    domicilio: String,
    ciudad: String,
    cPostal: String,
    cuit: String,
    estadoCivil: String,
    profesion: String,
    fecNac: Date,
    condIva: String,
    obs: String,
    estado: Boolean,
    urlDni: String,
    urlRecibo: String
})

module.exports = mongoose.model("clientes", ClientesSchema)