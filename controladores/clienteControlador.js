"use strict"

var Clientes = require("../modelos/cliente.js");

function altaCliente(req, res) {
	var cliente = new Clientes();

	var parametros = req.body;

	Object.assign(cliente,parametros);
	cliente.estado = true;

	Clientes.findOne({dni: parametros.dni}, (error, clienteEncontrado) => {

		//console.log(clienteEncontrado);
		if(clienteEncontrado){
			res.status(200).send({mensaje:"Cliente existente"});
		}
		else{
			cliente.save((error, clienteGuardado)=>{

			if(error){

				res.status(500).send({mensaje: "error al guardar"});
			}

			else {

				if(!clienteGuardado){
					res.status(404).send({mensaje: "error al guardar 1"});
				}

				else {
					res.status(200).send({clienteGuardado});
				}
		}
	})
		}
	})

	
}

function getClientes(req, res){

	Clientes.find({estado: true},(error,mostrarClientes)=>{

		if(error){
			res.status(500).send({mensaje: "error"});
		}else {

			res.status(200).send({mostrarClientes});
		}
	}).sort("_id");
}

function getCliente(req, res){
	var idC= req.params.id;
	Clientes.findOne({dni:idC},(error,cliente)=>{
		if(error){
			res.status(500).send({mensaje:"error al obtener ", error})
		}else{
			if(!cliente){
				res.status(404).send({mensaje: "Cliente no encontrado!"});
			}else{
				res.status(200).send({cliente});
			}
			
		}
	})
}

function putCliente(req, res){
	var idC = req.params.id;
	var actualizar = req.body;
	Clientes.findByIdAndUpdate( idC, actualizar, (error, actualizado)=>{
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


module.exports = {
	altaCliente,
	getClientes,
	getCliente,
	putCliente
}