"use strict"

var Cheque = require("../modelos/cheque.js");
var libradores = require("../modelos/librador.js");
var Clientes = require("../modelos/cliente.js");

function altaCheque (req, res) {
	var cheques = new Cheque();
	var parametros = req.body;
	
	Object.assign(cheques,parametros);
	cheques.estado = true;

	Cheque.findOne({numero: parametros.numero},(error, chequeEncontrado)=>{

		if(chequeEncontrado){
			res.status(200).send({mensaje: "El numero de cheque ya fue ingresado. Intente nuevamente"});
		}

		else{
			cheques.save((error, ChequeGuardado) => {
				if(error){
					res.status(500).send({mensaje:"error al guardar"});
				}
				else{

					if(!ChequeGuardado){
						res.status(404).send({mensaje:"error al guardar"})
					}else {
						res.status(200).send({ChequeGuardado});
					}
					
				}
			})
		}

	})
	
}

function getCheques(req, res){

	Cheque.find((error,mostrarCheques)=>{

		if(error){
			res.status(500).send({mensaje: "error"});
		}else {

			res.status(200).send({mostrarCheques});
		}
	}).sort("_id").populate("entregador");
} 

function getCheque(req, res){
	var id= req.params.id;
	Cheque.findById(id,(error,Cheque)=>{
		if(error){
			res.status(500).send({mensaje:"error al obtener"})
		}else{
			if(!Cheque){
				res.status(404).send({mensaje: "error al actualizar"});
			}else{
				res.status(200).send({Cheque});
			}
			
		}
	}).populate("entregador");
}

function putCheque(req, res){
	var idV = req.params.id;
	var actualizar = req.body;
	Cheque.findByIdAndUpdate( idV, actualizar, (error, actualizado)=>{
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
	altaCheque,
	getCheques,
	getCheque,
	putCheque
}