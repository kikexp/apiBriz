'use strict'

var mongoose = require("mongoose");

var app = require('./app.js');
var port = process.env.PORT || 1200

mongoose.connect("mongodb://localhost:27017/brizDb", (error, respuesta) => {
	if(error){
		throw error;
	}
	else{
		console.log('Conexion ok');

		app.listen(port, function(){
			console.log("servidor en el puerto: "+ port);
		})

	}
})