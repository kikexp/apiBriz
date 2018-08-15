"use strict"

var Vehiculo = require("../modelos/vehiculo.js");
var vendedor = require("../modelos/cliente.js");

function altaVehiculo (req, res) {
	var vehiculos = new Vehiculo();
	var parametros = req.body;
	parametros.vendedor = parametros.vendedor._id;
	Object.assign(vehiculos,parametros);
	
	Vehiculo.findOne({$and: [{$or:[{numeroChasis: parametros.numeroChasis}, {dominio: parametros.dominio}]}, {estado: false}]}, (error, vehiculoEncontrado)=>{
		if(vehiculoEncontrado){
			res.status(200).send({mensaje:"Vehiculo existente"})
		}
		else
		{
			vehiculos.estado = true;
			vehiculos.save((error, vehiculoGuardado) => {
				if(error){
					res.status(500).send({mensaje:"error"});
				}
				else{

					if(!vehiculoGuardado){
						res.status(404).send({mensaje:"error 1"})
					}else {
						res.status(200).send({vehiculoGuardado});
					}
					
				}
			})
		}

	})
	
}

function getVehiculos(req, res){

	Vehiculo.find({estado: true},(error,mostrarVehiculos)=>{

		if(error){
			res.status(500).send({mensaje: "error", error});
		}else {

			res.status(200).send({mostrarVehiculos});
		}
	}).sort("_id").populate("vendedor");
} 

function getVehiculo(req, res){
	var idV = req.params.id;

	Vehiculo.findOne({$and: [{$or:[{numeroChasis: idV}, {dominio: idV}]}, {estado: true}]},(error,vehiculo)=>{
		if(error){
			res.status(500).send({mensaje:"error al obtener", error})
		}else{
			if(!vehiculo){
				res.status(404).send({mensaje: "Vehiculo no encontrado!"});
			}else{
				res.status(200).send({vehiculo});
			}
			
		}
	}).populate("vendedor");
}

function putVehiculo(req, res){
	var idV = req.params.id;
	var actualizar = req.body;
	Vehiculo.findByIdAndUpdate( idV, actualizar, (error, actualizado)=>{
		if(error){
			res.status(500).send({mensaje:"error al actualizar"})
		}
		else{
			if(!actualizado){
				res.status(404).send({mensaje:"error al actualizar"})
			}else{
				res.status(200).send({actualizado});
			}
			
		}
	})
}

module.exports ={
	altaVehiculo,
	getVehiculos,
	getVehiculo,
	putVehiculo
}