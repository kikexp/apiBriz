"use strict"

var Vehiculo = require("../modelos/vehiculo.js");

function altaVehiculo (req, res) {
	var vehiculos = new Vehiculo();
	var parametros = req.body;

	Object.assign(vehiculos,parametros);
	vehiculos.estado = true;
	Vehiculo.findOne({numeroChasis: parametros.numeroChasis}, (error, vehiculoEncontrado)=>{
		if(vehiculoEncontrado){
			res.status(200).send({mensaje:"Vehiculo existente"})
		}
		else
		{
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

	Vehiculo.find((error,mostrarVehiculos)=>{

		if(error){
			res.status(500).send({mensaje: "error"});
		}else {

			res.status(200).send({mostrarVehiculos});
		}
	}).sort("_id");
} 

function getVehiculo(req, res){
	var idV = req.params.id;

	Vehiculo.findOne({numeroChasis: idV},(error,vehiculo)=>{
		if(error){
			res.status(500).send({mensaje:"error al obtener"})
		}else{
			if(!vehiculo){
				res.status(404).send({mensaje: "Vehiculo no encontrado!"});
			}else{
				res.status(200).send({vehiculo});
			}
			
		}
	})
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