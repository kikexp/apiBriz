"use strict"
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var clientes = mongoose.model('clientes');
var findOrCreate = require('mongoose-findorcreate')

var VehiculosSchema= Schema({
	marca: String,
	modelo: String,
	year: Number,
	dominio: String,
	numeroChasis: String,
	fechaIngreso: {type: Date,
		default: Date.now },
	precioVenta: String,
	precioCompra: String,
	titulo: Boolean,
	cedulaVerde: Boolean,
	formularioFirmado: Boolean,
	impParque: [{}],
	verPolicial: Boolean,
	estadoDom: Boolean,
	prenda: Boolean,
	rto: Boolean,
	cedulaGnc: Boolean,
	duplicadoLlave: Boolean,
	manuales: Boolean,
	codigoRadio: Boolean,
	ruedaAuxilio: Boolean,
	llaveRueda: Boolean,
	gato: Boolean,
	observaciones: String,
	estado: Boolean,
	vendedor: { type: Schema.ObjectId, ref: "clientes" }

})
VehiculosSchema.plugin(findOrCreate);
module.exports = mongoose.model("vehiculos", VehiculosSchema);