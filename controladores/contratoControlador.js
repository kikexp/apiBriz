"use strict"

var Contrato = require("../modelos/contrato.js");

function altaContrato (req, res) {
	var contratos = new Contrato();
	var parametros = req.body;

	Object.assign(contratos,parametros);
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
				res.status(200).send({ContratoGuardado});
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