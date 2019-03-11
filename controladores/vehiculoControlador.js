"use strict"
var findOrCreate = require('mongoose-findorcreate')
var Vehiculo = require("../modelos/vehiculo.js");
var vendedor = require("../modelos/cliente.js");

function altaVehiculo(req, res) {

    var vehiculos = new Vehiculo();


    var parametros = req.body;

    if (parametros.vendedor) {
        parametros.vendedor = parametros.vendedor._id;
    }

    if (!parametros.numeroChasis) {
        Vehiculo.findOne({

            $and: [
                { dominio: parametros.dominio },
                { estado: true }
            ]

        }, function(err, vehiculoExistente) {
            if (err) {
                res.status(500).send({ mensaje: "error al guardar" })
            } else {
                console.log(vehiculoExistente)
                if (!vehiculoExistente) {
                    console.log(parametros)
                    Object.assign(vehiculos, parametros);
                    vehiculos.estado = true;
                    vehiculos.save((error, vehiculoGuardado) => {
                            if (error) {
                                res.status(500).send({ mensaje: "error" });
                            } else {

                                if (!vehiculoGuardado) {
                                    res.status(200).send({ mensaje: "error 1" })
                                } else {
                                    res.status(200).send({ mensaje: "vehiculo guardado", vehiculoGuardado });

                                }

                            }
                        })
                        //res.status(200).send({mensaje: "vehiculo creado", vehiculoGuardado})
                } else {
                    res.status(200).send({ mensaje: "vehiculo existente" })
                }
            }
        })
    } else {
        Vehiculo.findOne({

            $and: [
                { numeroChasis: parametros.numeroChasis },
                { estado: true }
            ]

        }, function(err, vehiculoExistente) {
            if (err) {
                res.status(500).send({ mensaje: "error al guardar" })
            } else {
                //console.log(vehiculoExistente)
                if (!vehiculoExistente) {
                    console.log(parametros)
                    Object.assign(vehiculos, parametros);
                    vehiculos.estado = true;
                    vehiculos.save((error, vehiculoGuardado) => {
                            if (error) {
                                res.status(500).send({ mensaje: "error" });
                            } else {

                                if (!vehiculoGuardado) {
                                    res.status(200).send({ mensaje: "error 1" })
                                } else {
                                    res.status(200).send({ mensaje: "vehiculo guardado", vehiculoGuardado });

                                }

                            }
                        })
                        //res.status(200).send({mensaje: "vehiculo creado", vehiculoGuardado})
                } else {
                    res.status(200).send({ mensaje: "vehiculo existente" })
                }
            }
        })
    }


}

function getVehiculos(req, res) {

    Vehiculo.find({ estado: true }, "_id marca modelo dominio numeroChasis year precioVenta")
        .sort("marca")
        .populate("vendedor")
        .exec((error, mostrarVehiculos) => {

            if (error) {
                res.status(500).send({ mensaje: "error", error });
            } else {

                res.status(200).send({ mostrarVehiculos });
            }
        });
}

function getVehiculo(req, res) {
    var idV = req.params.id;

    Vehiculo.findOne({

        $and: [
            { $or: [{ numeroChasis: idV }, { dominio: idV }] },
            { estado: true }
        ]

    }, (error, vehiculo) => {
        if (error) {
            res.status(500).send({ mensaje: "error al obtener", error })
        } else {
            if (!vehiculo) {
                res.status(404).send({ mensaje: "Vehiculo no encontrado!" });
            } else {
                res.status(200).send({ vehiculo });
            }

        }
    }).populate("vendedor");
}

function putVehiculo(req, res) {
    console.log("entra al controlador")
    var idV = req.params.id;
    var actualizar = req.body;
    console.log(actualizar.vendedor);
    console.log(actualizar)

    if ('vendedor' in actualizar) {
        console.log("entra al if de vendedor")
        if (actualizar.vendedor.dni) {
            console.log("entra al if de vendedor.dni")
            vendedor.findOne({ dni: actualizar.vendedor.dni }, (error, vendedor) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log("entra al buscar vendedor", vendedor);

                    if (!vendedor._id) {
                        Object.assign(vendedor, actualizar.vendedor);
                        vendedor.save((error, vendedorGuardado) => {

                            if (error) {

                                res.status(500).send({ mensaje: "error al guardar" });
                            } else {

                                if (!clienteGuardado) {
                                    res.status(404).send({ mensaje: "error al guardar 1" });
                                } else {
                                    actualizar.vendedor = vendedorGuardado;
                                    Vehiculo.findByIdAndUpdate(idV, actualizar, (error, actualizado) => {
                                        if (error) {
                                            console.log(error)
                                            res.status(500).send({ mensaje: "error al actualizar" });

                                        } else {
                                            if (!actualizado) {
                                                res.status(404).send({ mensaje: "error al actualizar" })
                                                console.log(error);
                                            } else {
                                                res.status(200).send({ actualizado });
                                            }

                                        }
                                    })
                                    res.status(200).send({ clienteGuardado });
                                }
                            }
                        })
                    }
                    actualizar.vendedor = vendedor._id.toString();
                    console.log(actualizar)

                    Vehiculo.findByIdAndUpdate(idV, actualizar, (error, actualizado) => {
                        if (error) {
                            console.log(error)
                            res.status(500).send({ mensaje: "error al actualizar" });

                        } else {
                            if (!actualizado) {
                                res.status(404).send({ mensaje: "error al actualizar" })
                                console.log(error);
                            } else {
                                res.status(200).send({ actualizado });
                            }

                        }
                    })


                }
            })
        } else {
            delete actualizar.vendedor;
            Vehiculo.findByIdAndUpdate(idV, actualizar, (error, actualizado) => {
                if (error) {
                    console.log(error)
                    res.status(500).send({ mensaje: "error al actualizar" });

                } else {
                    if (!actualizado) {
                        res.status(404).send({ mensaje: "error al actualizar" })
                        console.log(error);
                    } else {
                        res.status(200).send({ actualizado });
                    }

                }
            })
        }
    } else {
        Vehiculo.findByIdAndUpdate(idV, actualizar, (error, actualizado) => {
            if (error) {
                console.log(error)
                res.status(500).send({ mensaje: "error al actualizar" });

            } else {
                if (!actualizado) {
                    res.status(404).send({ mensaje: "error al actualizar" })
                    console.log(error);
                } else {
                    res.status(200).send({ actualizado });
                }

            }
        })
    }




}

module.exports = {
    altaVehiculo,
    getVehiculos,
    getVehiculo,
    putVehiculo
}