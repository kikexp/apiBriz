"use strict"

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var clientes = mongoose.model('clientes');
var vehiculos = mongoose.model('vehiculos');

var ContratoSchema = Schema({

	fechaIngreso: Date,
	numeroVenta: Number,
	vehiculo: { type: Schema.ObjectId, ref: "vehiculos"},
	propietarios: [{type: Schema.ObjectId, ref: "clientes"}],	
	gastos: String,
	total: String,
	sena: String,
	contado: String,
	usado: { type: Schema.ObjectId, ref: "vehiculos"},
	montoFinanc: String,
	cantCuotas: String,
	importeCuotas: String,
	adicional: String,
	estado: Boolean


})

module.exports = mongoose.model("contrato", ContratoSchema)