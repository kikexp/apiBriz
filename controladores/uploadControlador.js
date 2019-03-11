"use strict"
// importamos la libreria de upload
var fileUpload = require('express-fileupload')
    // Importamos el modelo de usuarios
var Usuarios = require("../modelos/usuario.js");

var Clientes = require("../modelos/cliente.js");

//Importamos la dependencia para encriptar contraseñas
var bcrypt = require("bcrypt-nodejs");

//Importamos el token
var token = require("../seguridad/token.js");

const path = require('path');
var fs = require('fs');

function subirArchivo(req, res) {

    if (!req.files) {
        res.status(400).send("no hay archivos para subir")
    }

    // obtener archivo
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extension = nombreCortado[nombreCortado.length - 1];

    //validar extension
    var extensionesValidas = ['png', 'jpg', 'jpeg', 'pdf'];
    if (extensionesValidas.indexOf(extension) < 0) {
        res.status(400).send("Extensiones validas: " + extensionesValidas.join(', '));
    }

    //nombre perzonalizado
    var nombreArchivo = Math.random().toString(36).substr(2, 9);

    var path = `./archivos/${ nombreArchivo }.${ extension }`;

    archivo.mv(path, err => {
        if (err) {
            res.status(500).send("error al subir");
        }
        actualizarRegistro(req.params.id, req.params.tipo, nombreArchivo.concat(".".concat(extension)), res)

    })
}

function actualizarRegistro(id, tipo, nombreArchivo, res) {
    Clientes.findById(id, (error, cliente) => {
        if (!cliente) {
            return res.status(404).send("Usuario no encontrado")
        }
        if (tipo === "urlDni") {
            var pathViejo = './archivos/' + cliente.urlDni;
            console.log(pathViejo);
            // Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                console.log("entra aqui");
                fs.unlink(pathViejo, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("eliminado")
                    }
                })
            }

            cliente.urlDni = nombreArchivo;

            cliente.save((err, clienteActualizado) => {
                if (err) {
                    res.status(404).send(err)
                }

                res.status(200).send({ clienteActualizado })

            });
        } else {
            var pathViejo = '../archivos/' + cliente.urlRecibo;

            // Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            cliente.urlRecibo = nombreArchivo;

            cliente.save((err, clienteActualizado) => {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de cliente actualizada',
                    usuario: clienteActualizado
                });

            });
        }
    })

}


function descargarArchivo(req, res) {
    var tipo = req.params.tipo;
    var img = req.params.img;

    var pathImagen = path.resolve(__dirname, '../archivos/' + img);
    //var path = '../archivos/_ppkyk2nto.jpg';

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        res.status(404).send("no se encontro imagen");
    }
}



function prueba(req, res) {
    res.status(200).json({
        ok: true,
        mensaje: "tamo bien"
    })
}

module.exports = {
    prueba,
    subirArchivo,
    descargarArchivo
}