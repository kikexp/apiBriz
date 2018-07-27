"use strict"

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var clientes = mongoose.model('clientes');

var ChequeSchema = Schema({
	numero: Number,
	banco: String,
	monto: String,
	vencimiento: Date,
	recepcion: Date,
	motivo: String,
	entregador: { type: Schema.ObjectId, ref: "clientes" },
	librador: { nombre: String,
				contacto: String,
				direccion: String },
	estado: Boolean,
	concepto: String,
	observaciones: String

})

module.exports = mongoose.model("cheques", ChequeSchema)