var app = require ('./app');
var http = require ('http');

var port = process.env.PORT;
app.set('port', port);

var server = http.createServer(app);

var mongoose = require("mongoose");
mongoose.connect("mongodb://apiBriz:C0nCeSi0Nar1a_Br1Zuela@ds018258.mlab.com:18258/brizueladb", (error, respuesta) => {
	if(error){
		throw error;
	}
	else{
		console.log('Conexion ok');

		server.listen(port, function(){
			console.log("servidor en el puerto: "+ port);
		})

	}
})

