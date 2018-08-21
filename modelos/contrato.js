"use strict"

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var clientes = mongoose.model('clientes');
var vehiculos = mongoose.model('vehiculos');

var ContratoSchema = Schema({

	fechaIngreso: Date,
	vehiculo: { type: Schema.ObjectId, ref: "vehiculos"},
	propietarios: [{type: Schema.ObjectId, ref: "clientes"}],	
	gastos: Number,
	total: Number,
	sena: Number,
	contado: Number,
	usado: { type: Schema.ObjectId, ref: "vehiculos"},
	montoFinanc: Number,
	cantCuotas: Number,
	importeCuotas: String,
	adicional: String,
	estado: Boolean


})

module.exports = mongoose.model("contrato", ContratoSchema)