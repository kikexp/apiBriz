"use strict"

var Contrato = require("../modelos/contrato.js");

function altaContrato (req, res) {
	var contratos = new Contrato();
	var parametros = req.body;
	var arrayProp = []

	Object.assign(contratos,parametros);
	arrayProp.push(contratos.propietarios[0])
	if(contratos.propietarios[1] != ''){
		arrayProp[1] = contratos.propietarios[1]
	}
	contratos.propietarios = arrayProp;
	console.log(arrayProp)
	console.log(contratos.propietarios)
	contratos.estado = true;
	contratos.save((error, ContratoGuardado) => {
		if(error){
			res.status(500).send({mensaje:"error"});
			console.log(error);
		}
		else{

			if(!ContratoGuardado){
				res.status(404).send({mensaje:"error 1"})
			}else {
				Contrato.findById(ContratoGuardado.id,(error,Contrato)=>{
					if(error){
						res.status(500).send({mensaje:"error al obtener"})
					}else{
						if(!Contrato){
							res.status(404).send({mensaje: "error al actualizar"});
						}else{
							res.status(200).send({Contrato});
						}
						
					}
				}).populate("vehiculo").populate("propietarios").populate("usado")
				
			}
			
		}
	})
}

function getContratos(req, res){

	Contrato.find({estado: true},(error,mostrarContratos)=>{

		if(error){
			res.status(500).send({mensaje: "error"});
		}else {

			res.status(200).send({mostrarContratos});
		}
	}).sort("_id").populate("vehiculo").populate("propietarios");
} 

function getContrato(req, res){
	var id= req.params.id;
	Contrato.findById(id,(error,Contrato)=>{
		if(error){
			res.status(500).send({mensaje:"error al obtener"})
		}else{
			if(!Contrato){
				res.status(404).send({mensaje: "error al actualizar"});
			}else{
				res.status(200).send({Contrato});
			}
			
		}
	}).populate("vehiculo").populate("propietarios").populate("usado")
}

function putContrato(req, res){
	var idV = req.params.id;
	var actualizar = req.body;
	var arrayProp = []
	arrayProp[0] = actualizar.propietarios[0]._id
	if (actualizar.usado) {
		actualizar.usado = actualizar.usado._id;
	}
	if(actualizar.vehiculo){
		actualizar.vehiculo = actualizar.vehiculo._id
	}

	if(actualizar.propietarios[1]){
		arrayProp[1] = actualizar.propietarios[1]._id
	}
	actualizar.propietarios = arrayProp
	console.log(actualizar);
	console.log(arrayProp)
	Contrato.findByIdAndUpdate( idV, actualizar, (error, actualizado)=>{
		if(error){
			console.log(error)
			res.status(500).send({mensaje: error})
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
	altaContrato,
	getContratos,
	getContrato,
	putContrato
}