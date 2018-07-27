"use strict"

var Librador = require("../modelos/librador.js");

function altaLibrador (req, res) {
	var libradors = new Librador();
	var parametros = req.body;
	console.log("entra");

	Object.assign(libradors,parametros);

	libradors.save((error, LibradorGuardado) => {

		if(error){
			res.status(500).send({mensaje:"error"});
		}
		else{

			if(!LibradorGuardado){
				res.status(404).send({mensaje:"error 1"})
			}else {
				res.status(200).send({LibradorGuardado});
			}
			
		}
	})
}

function getLibradors(req, res){

	Librador.find((error,mostrarLibradors)=>{

		if(error){
			res.status(500).send({mensaje: "error"});
		}else {

			res.status(200).send({mostrarLibradors});
		}
	}).sort("_id");
} 

function getLibrador(req, res){
	var id= req.params.id;
	Librador.findById(id,(error,Librador)=>{
		if(error){
			res.status(500).send({mensaje:"error al obtener"})
		}else{
			if(!Librador){
				res.status(404).send({mensaje: "error al actualizar"});
			}else{
				res.status(200).send({Librador});
			}
			
		}
	})
}

function putLibrador(req, res){
	var idV = req.params.id;
	var actualizar = req.body;
	Librador.findByIdAndUpdate( idV, actualizar, (error, actualizado)=>{
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
	altaLibrador,
	getLibradors,
	getLibrador,
	putLibrador
}