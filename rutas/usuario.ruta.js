"use strict"
// Cargamos la dependencia de Express
var express = require("express");

//Cargamos el módulo del controlador
var ControladorUsuarios = require("../controladores/usuarioControlador.js");

// Cargamos el Router de Express.js y con esto podemos crear rutas para nuestra API REST.
var api = express.Router();

var md_aut = require("../seguridad/auth.js");

//Creamos la ruta con el método GET, para pasar el método que va a tener que cargar la página cuando hagamos la petición HTTP de esa ruta
//api.get("/probando-controlador-usuarios", md_aut.autenticacion, ControladorUsuarios.pruebaUsuarios);

//Creamos la ruta para crear usuarios y utilizamos el método POST
api.post("/crear-usuarios", ControladorUsuarios.crearUsuarios);

//Creamos la ruta para el ingreso de usuario y utilizamos el método POST
api.post("/login", ControladorUsuarios.ingresoUsuario);

//Creamos la ruta para la actualización del usuario y utilizamos el método PUT
api.put("/actualizar-usuario/:id", md_aut.autenticacion, ControladorUsuarios.actualizarUsuario);

//Creamos la ruta para borrar usuario y utilizamos el método DELETE
api.delete("/borrar-usuario/:id", md_aut.autenticacion, ControladorUsuarios.borrarUsuario);


//EXportamos el módulo api
module.exports = api;