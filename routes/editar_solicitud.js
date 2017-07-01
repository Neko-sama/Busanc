var express = require('express');
var router = express.Router();
var session = require('express-session');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var app = express();
var sql = require("mssql");
var multer = require('multer');
var upload = multer(); 
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');

var dbConfig = {
    server: "200.75.0.112",
    database: "busanc",
    user: "admin14",
    password: "2422",
    port: 1433

};

var cuentas;
var permiso0;
var permiso1;
var permiso21;
var permiso22;
var permiso31;
var permiso32;
var permiso4;
var permiso5;
var permiso6;
var permiso7;
var permiso8;
var permiso9;
var permiso10;

router.get('/id/*', function (req, res) {
    var ID;
    var Url = req.originalUrl;
    ID = Url.replace('/editar_solicitud/id/', '');
    req.session.registro = ID;

    //res.send(ID)
    res.redirect('/redirect/editar_solicitud');
});


function checkAuth(req, res, next) {
    cuentas = req.session.cuentas;
    permiso0 = req.session.permiso0;
    permiso1 = req.session.permiso1;
    permiso21 = req.session.permiso21;
    permiso22 = req.session.permiso22;
    permiso31 = req.session.permiso31;
    permiso32 = req.session.permiso32;
    permiso4 = req.session.permiso4;
    permiso5 = req.session.permiso5;
    permiso6 = req.session.permiso6;
    permiso7 = req.session.permiso7;
    permiso8 = req.session.permiso8;
    permiso9 = req.session.permiso9;
    permiso10 = req.session.permiso10;
    if (!req.session.ID) {
        res.send('No esta autorizado para ver esta pagina');
    } else {
        next();
    }
}
var resultado = [];
var seccion;

var transporter = nodemailer.createTransport(smtpTransport({
    host: 'mail.busanc.cl',
    port: 25,
    auth: {
        user: 'notificacion@busanc.cl',
        pass: 'not.2017'
    }
}));

/* GET home page. */
router.get('/editar/*', checkAuth, function (req, res) {

    var Url = req.originalUrl;
    seccion = Url.replace('/editar_registros.html/editar/', '');
    console.log('seccion')
    console.log(seccion)
    //res.send(ID)
    res.redirect('/editar_registros.html');
});

var ID;
var x;
var clientes = [];
var cod_clientes = [];
router.get('/', checkAuth, function (req, res) {
    ID = req.session.registro;
    console.log('ID');
    console.log(ID);
    var nombre_completo = req.session.nombre.replace('"', '').replace('"', '').replace('"', '').replace('"', '');
    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);



        req.query("select * from Indice2 where Id= " + ID + ";").then(function (recordset) {
            req.query("select * from Entradas_proyecto2 where Id = " + ID + ";").then(function (query1) {
                req.query("select * from Solicitud2 where Id= " + ID + ";").then(function (query2) {
                    req.query("select * from Clientes").then(function (query3) {

                        x = query3.length;
                        for (var flag = 0; flag < x; flag++) {
                            resultado = JSON.stringify(query3[flag].Nombre_cliente).replace('"', '').replace('"', '')
                            clientes.push(resultado);
                        }
                        //console.log(clientes)
                        for (var flag = 0; flag < x; flag++) {
                            resultado = JSON.stringify(query3[flag].Cod_cli).replace('"', '').replace('"', '')
                            cod_clientes.push(resultado);
                        }

                        resultado = [];
                        resultado[1] = JSON.stringify(recordset[0].Id).replace('"', '').replace('"', '')
                        resultado[2] = JSON.stringify(recordset[0].Proyecto).replace('"', '').replace('"', '')
                        resultado[3] = JSON.stringify(recordset[0].Cliente).replace('"', '').replace('"', '')
                        resultado[4] = JSON.stringify(recordset[0].Fecha_ingreso).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[5] = JSON.stringify(recordset[0].Codigo).replace('"', '').replace('"', '')
                        resultado[6] = JSON.stringify(recordset[0].Estado).replace('"', '').replace('"', '')
                        resultado[7] = JSON.stringify(query1[0].Requisitos_funcionales).replace('"', '').replace('"', '')
                        resultado[8] = JSON.stringify(query1[0].Requisitos_desempeño).replace('"', '').replace('"', '')
                        resultado[9] = JSON.stringify(query1[0].Requisitos_normativo).replace('"', '').replace('"', '')
                        resultado[10] = JSON.stringify(query1[0].Requisitos_legales).replace('"', '').replace('"', '')
                        resultado[11] = JSON.stringify(query1[0].Requisitos_reglamentarios).replace('"', '').replace('"', '')
                        resultado[12] = JSON.stringify(query1[0].IA_Muestra_fisica).replace('"', '').replace('"', '')
                        resultado[13] = JSON.stringify(query1[0].EP_Muestra_fisica).replace('"', '').replace('"', '')
                        resultado[14] = JSON.stringify(query1[0].Fecha_Muestra_fisica).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[15] = JSON.stringify(query1[0].IA_Fotografia).replace('"', '').replace('"', '')
                        resultado[16] = JSON.stringify(query1[0].EP_Fotografia).replace('"', '').replace('"', '')
                        resultado[17] = JSON.stringify(query1[0].Fecha_Fotografia).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[18] = JSON.stringify(query1[0].IA_Planos_adjuntos).replace('"', '').replace('"', '')
                        resultado[19] = JSON.stringify(query1[0].EP_Planos_adjuntos).replace('"', '').replace('"', '')
                        resultado[20] = JSON.stringify(query1[0].Fecha_Planos_adjuntos).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[21] = JSON.stringify(query1[0].IA_Levantamientos_medidas).replace('"', '').replace('"', '')
                        resultado[22] = JSON.stringify(query1[0].EP_Levantamientos_medidas).replace('"', '').replace('"', '')
                        resultado[23] = JSON.stringify(query1[0].Fecha_Levantamientos_medidas).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[24] = JSON.stringify(query1[0].IA_Mail_respaldo).replace('"', '').replace('"', '')
                        resultado[25] = JSON.stringify(query1[0].EP_Mail_respaldo).replace('"', '').replace('"', '')
                        resultado[26] = JSON.stringify(query1[0].Fecha_Mail_respaldo).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[27] = JSON.stringify(query1[0].Descripcion_Tecnica).replace('"', '').replace('"', '')
                        resultado[28] = JSON.stringify(query1[0].Potenciales_fallas).replace('"', '').replace('"', '')
                        resultado[29] = JSON.stringify(query2[0].Fecha_modificacion).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[30] = JSON.stringify(query2[0].Fecha_entrega_proyecto).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[31] = JSON.stringify(query2[0].Nombre_proyecto).replace('"', '').replace('"', '')
                        resultado[32] = JSON.stringify(query2[0].Nombre_cliente).replace('"', '').replace('"', '')
                        resultado[33] = JSON.stringify(query2[0].Area).replace('"', '').replace('"', '')
                        resultado[34] = JSON.stringify(query2[0].Fecha_visita).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[35] = JSON.stringify(query2[0].Descripcion_proyecto).replace('"', '').replace('"', '')
                        resultado[36] = JSON.stringify(query2[0].Observacion_fallo).replace('"', '').replace('"', '')
                        resultado[37] = JSON.stringify(query2[0].Observacion_muefis).replace('"', '').replace('"', '')
                        resultado[38] = JSON.stringify(query2[0].Observacion_fot).replace('"', '').replace('"', '')
                        resultado[39] = JSON.stringify(query2[0].Observacion_plaadj).replace('"', '').replace('"', '')
                        resultado[40] = JSON.stringify(query2[0].Observacion_levmed).replace('"', '').replace('"', '')
                        resultado[41] = JSON.stringify(query2[0].nombre_vendedor).replace('"', '').replace('"', '')
                        resultado[42] = JSON.stringify(query2[0].cod_cliente).replace('"', '').replace('"', '')


                        ejs.renderFile('./views/orden_proyecto.ejs', {
                            nombre_completo: nombre_completo,
                            title: ID,
                            resultado1: resultado[1],
                            resultado7: resultado[12],
                            resultado10: resultado[15],
                            resultado13: resultado[18],
                            resultado16: resultado[21],
                            resultado19: resultado[27],
                            resultado230: resultado[41],
                            resultado203: resultado[4],
                            resultado222: resultado[29],
                            resultado223: resultado[31],
                            resultado228: resultado[42],
                            resultado225: resultado[33],
                            resultado202: resultado[3],
                            resultado226: resultado[34],
                            
                        }, function (err, result) {
                            if (err) {
                                return console.log(err);
                            }
                            fs.writeFile("./public/html/Solicitud_Cliente-" + resultado[1] + ".html", result, function (err) {
                                if (err) {
                                    return console.log(err);
                                }
                                console.log("The file was saved!");
                            });
                        });

                        for (var flag = 1; flag <= 40; flag++) {
                            if (resultado[flag] == 'null') {
                                resultado[flag] = "NAP";
                            }
                            if (resultado[flag] == undefined) {
                                resultado[flag] = "NAP";
                            }


                            resultado[flag] = resultado[flag].toUpperCase();
                            // console.log (resultado[flag])
                        }
                        //res.render('modificar_sc', {
                        res.render('ver_sc', {
                            ids: ID,
                            modif: seccion,
                            vpermiso0: permiso0,
                            vpermiso1: permiso1,
                            vpermiso21: permiso21,
                            vpermiso22: permiso22,
                            vpermiso31: permiso31,
                            vpermiso32: permiso32,
                            vpermiso4: permiso4,
                            vpermiso5: permiso5,
                            vpermiso6: permiso6,
                            vpermiso7: permiso7,
                            vpermiso8: permiso8,
                            vpermiso9: permiso9,
                            vpermiso10: permiso10,
                            resultado1: resultado[1],
                            resultado2: resultado[2],
                            resultado3: resultado[3],
                            resultado4: resultado[4],
                            resultado5: resultado[5],
                            resultado6: resultado[6],
                            resultado7: resultado[7],
                            resultado8: resultado[8],
                            resultado9: resultado[9],
                            resultado10: resultado[10],
                            resultado11: resultado[11],
                            resultado12: resultado[12],
                            resultado13: resultado[13],
                            resultado14: resultado[14],
                            resultado15: resultado[15],
                            resultado16: resultado[16],
                            resultado17: resultado[17],
                            resultado18: resultado[18],
                            resultado19: resultado[19],
                            resultado20: resultado[20],
                            resultado21: resultado[21],
                            resultado22: resultado[22],
                            resultado23: resultado[23],
                            resultado24: resultado[24],
                            resultado25: resultado[25],
                            resultado26: resultado[26],
                            resultado27: resultado[27],
                            resultado28: resultado[28],
                            resultado29: resultado[29],
                            resultado30: resultado[30],
                            resultado31: resultado[31],
                            resultado32: resultado[32],
                            resultado33: resultado[33],
                            resultado34: resultado[34],
                            resultado35: resultado[35],
                            resultado36: resultado[36],
                            resultado37: resultado[37],
                            resultado38: resultado[38],
                            resultado39: resultado[39],
                            resultado40: resultado[40],
                            num: x,
                            arr_clientes: clientes,
                            arr_cod_clientes: cod_clientes 


                        });
                        conn.close();
                    }).catch(function (err) { console.log(err); conn.close(); })
                }).catch(function (err) { console.log(err); conn.close(); })
            }).catch(function (err) { console.log(err); conn.close(); })
        }).catch(function (err) { console.log(err); conn.close(); })


    });
});


router.get('/modificar', checkAuth, function (req, res) {
    ID = req.session.registro;
    console.log('ID');
    console.log(ID);
    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);



        req.query("select * from Indice2 where Id= " + ID + ";").then(function (recordset) {
            req.query("select * from Entradas_proyecto2 where Id = " + ID + ";").then(function (query1) {
                req.query("select * from Solicitud2 where Id= " + ID + ";").then(function (query2) {
                    req.query("select * from Clientes").then(function (query3) {

                        x = query3.length;
                        for (var flag = 0; flag < x; flag++) {
                            resultado = JSON.stringify(query3[flag].Nombre_cliente).replace('"', '').replace('"', '')
                            clientes.push(resultado);
                        }
                        //console.log(clientes)
                        for (var flag = 0; flag < x; flag++) {
                            resultado = JSON.stringify(query3[flag].Cod_cli).replace('"', '').replace('"', '')
                            cod_clientes.push(resultado);
                        }
                        resultado = [];
                        resultado[1] = JSON.stringify(recordset[0].Id).replace('"', '').replace('"', '')
                        resultado[2] = JSON.stringify(recordset[0].Proyecto).replace('"', '').replace('"', '')
                        resultado[3] = JSON.stringify(recordset[0].Cliente).replace('"', '').replace('"', '')
                        resultado[4] = JSON.stringify(recordset[0].Fecha_ingreso).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[5] = JSON.stringify(recordset[0].Codigo).replace('"', '').replace('"', '')
                        resultado[6] = JSON.stringify(recordset[0].Estado).replace('"', '').replace('"', '')
                        resultado[7] = JSON.stringify(query1[0].Requisitos_funcionales).replace('"', '').replace('"', '')
                        resultado[8] = JSON.stringify(query1[0].Requisitos_desempeño).replace('"', '').replace('"', '')
                        resultado[9] = JSON.stringify(query1[0].Requisitos_normativo).replace('"', '').replace('"', '')
                        resultado[10] = JSON.stringify(query1[0].Requisitos_legales).replace('"', '').replace('"', '')
                        resultado[11] = JSON.stringify(query1[0].Requisitos_reglamentarios).replace('"', '').replace('"', '')
                        resultado[12] = JSON.stringify(query1[0].IA_Muestra_fisica).replace('"', '').replace('"', '')
                        resultado[13] = JSON.stringify(query1[0].EP_Muestra_fisica).replace('"', '').replace('"', '')
                        resultado[14] = JSON.stringify(query1[0].Fecha_Muestra_fisica).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[15] = JSON.stringify(query1[0].IA_Fotografia).replace('"', '').replace('"', '')
                        resultado[16] = JSON.stringify(query1[0].EP_Fotografia).replace('"', '').replace('"', '')
                        resultado[17] = JSON.stringify(query1[0].Fecha_Fotografia).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[18] = JSON.stringify(query1[0].IA_Planos_adjuntos).replace('"', '').replace('"', '')
                        resultado[19] = JSON.stringify(query1[0].EP_Planos_adjuntos).replace('"', '').replace('"', '')
                        resultado[20] = JSON.stringify(query1[0].Fecha_Planos_adjuntos).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[21] = JSON.stringify(query1[0].IA_Levantamientos_medidas).replace('"', '').replace('"', '')
                        resultado[22] = JSON.stringify(query1[0].EP_Levantamientos_medidas).replace('"', '').replace('"', '')
                        resultado[23] = JSON.stringify(query1[0].Fecha_Levantamientos_medidas).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[24] = JSON.stringify(query1[0].IA_Mail_respaldo).replace('"', '').replace('"', '')
                        resultado[25] = JSON.stringify(query1[0].EP_Mail_respaldo).replace('"', '').replace('"', '')
                        resultado[26] = JSON.stringify(query1[0].Fecha_Mail_respaldo).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[27] = JSON.stringify(query1[0].Descripcion_Tecnica).replace('"', '').replace('"', '')
                        resultado[28] = JSON.stringify(query1[0].Potenciales_fallas).replace('"', '').replace('"', '')
                        resultado[29] = JSON.stringify(query2[0].Fecha_modificacion).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[30] = JSON.stringify(query2[0].Fecha_entrega_proyecto).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[31] = JSON.stringify(query2[0].Nombre_proyecto).replace('"', '').replace('"', '')
                        resultado[32] = JSON.stringify(query2[0].Nombre_cliente).replace('"', '').replace('"', '')
                        resultado[33] = JSON.stringify(query2[0].Area).replace('"', '').replace('"', '')
                        resultado[34] = JSON.stringify(query2[0].Fecha_visita).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                        resultado[35] = JSON.stringify(query2[0].Descripcion_proyecto).replace('"', '').replace('"', '')
                        resultado[36] = JSON.stringify(query2[0].Observacion_fallo).replace('"', '').replace('"', '')
                        resultado[37] = JSON.stringify(query2[0].Observacion_muefis).replace('"', '').replace('"', '')
                        resultado[38] = JSON.stringify(query2[0].Observacion_fot).replace('"', '').replace('"', '')
                        resultado[39] = JSON.stringify(query2[0].Observacion_plaadj).replace('"', '').replace('"', '')
                        resultado[40] = JSON.stringify(query2[0].Observacion_levmed).replace('"', '').replace('"', '')


                        for (var flag = 1; flag <= 40; flag++) {
                            if (resultado[flag] == 'null') {
                                resultado[flag] = "NAP";
                            }
                            if (resultado[flag] == undefined) {
                                resultado[flag] = "NAP";
                            }


                            resultado[flag] = resultado[flag].toUpperCase();
                            // console.log (resultado[flag])
                        }
                        //res.render('modificar_sc', {
                        res.render('modificar_sc', {
                            ids: ID,
                            modif: seccion,
                            vpermiso0: permiso0,
                            vpermiso1: permiso1,
                            vpermiso21: permiso21,
                            vpermiso22: permiso22,
                            vpermiso31: permiso31,
                            vpermiso32: permiso32,
                            vpermiso4: permiso4,
                            vpermiso5: permiso5,
                            vpermiso6: permiso6,
                            vpermiso7: permiso7,
                            vpermiso8: permiso8,
                            vpermiso9: permiso9,
                            vpermiso10: permiso10,
                            resultado1: resultado[1],
                            resultado2: resultado[2],
                            resultado3: resultado[3],
                            resultado4: resultado[4],
                            resultado5: resultado[5],
                            resultado6: resultado[6],
                            resultado7: resultado[7],
                            resultado8: resultado[8],
                            resultado9: resultado[9],
                            resultado10: resultado[10],
                            resultado11: resultado[11],
                            resultado12: resultado[12],
                            resultado13: resultado[13],
                            resultado14: resultado[14],
                            resultado15: resultado[15],
                            resultado16: resultado[16],
                            resultado17: resultado[17],
                            resultado18: resultado[18],
                            resultado19: resultado[19],
                            resultado20: resultado[20],
                            resultado21: resultado[21],
                            resultado22: resultado[22],
                            resultado23: resultado[23],
                            resultado24: resultado[24],
                            resultado25: resultado[25],
                            resultado26: resultado[26],
                            resultado27: resultado[27],
                            resultado28: resultado[28],
                            resultado29: resultado[29],
                            resultado30: resultado[30],
                            resultado31: resultado[31],
                            resultado32: resultado[32],
                            resultado33: resultado[33],
                            resultado34: resultado[34],
                            resultado35: resultado[35],
                            resultado36: resultado[36],
                            resultado37: resultado[37],
                            resultado38: resultado[38],
                            resultado39: resultado[39],
                            resultado40: resultado[40],
                            num: x,
                            arr_clientes: clientes,
                            arr_cod_clientes: cod_clientes


                        });
                        conn.close();
                    }).catch(function (err) { console.log(err); conn.close(); })
                }).catch(function (err) { console.log(err); conn.close(); })
            }).catch(function (err) { console.log(err); conn.close(); })
        }).catch(function (err) { console.log(err); conn.close(); })


    });
});


router.post('/', checkAuth, function (req, res) {
    var fecham = req.body.fecham;
    var reqfun = req.body.reqfun;
    var nproyecto = req.body.nproyecto;
    var reqdes = req.body.reqdes;
    var ncliente = req.body.ncliente;
    var reqnor = req.body.reqnor;
    var reqleg = req.body.reqleg;
    var area = req.body.area;
    var reqreg = req.body.reqreg;
    var fechav = req.body.fechav;
    var esptec = req.body.esptec;
    var potfal = req.body.potfal;

    for (var flag = 0; flag < x; flag++) {
        if (ncliente == clientes[flag]) {
            var cod_cliente = cod_clientes[flag]
        }
    }

    var querysalida1 = " Update Indice2 set  Cliente ='" + ncliente + "'  WHERE Id= " + ID + "; ";
    var querysalida2 = " Update Solicitud2 set Fecha_modificacion = '" + fecham + "', Nombre_proyecto ='" + nproyecto + "', Nombre_cliente= '" + ncliente + "', Area = '" + area + "', Fecha_visita = '" + fechav + "' , cod_cliente = '" + cod_cliente + "', Descripcion_proyecto = '" + esptec + "' WHERE Id= " + ID + "; ";
    var querysalida3 = " Update Entradas_proyecto2 set Potenciales_fallas = '" + potfal + "', Descripcion_Tecnica = '" + esptec + "', Requisitos_reglamentarios = '" + reqreg + "', Requisitos_legales = '" + reqleg + "', Requisitos_normativo ='" + reqnor + "', Requisitos_desempeño= '" + reqdes + "', Requisitos_funcionales = '" + reqfun + "'  WHERE Id= " + ID + "; ";
    console.log('----------inicio--------');
    console.log(querysalida1);
    console.log(querysalida2);
    console.log(querysalida3);
    console.log('----------final--------');
    var querysalida = querysalida1 + querysalida2 + querysalida3;


    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(querysalida).then(function (recordset) {
            conn.close();
        }).catch(function (err) { console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err); });

    //conn.connect().then(function () {
    //    var req = new sql.Request(conn);
    //    req.query(querysalida).then(function (recordset) {
    //        req.query("select * from Correos where id = 1;").then(function (recordset) {
    //            fase2 = JSON.stringify(recordset[0].Fase2).replace('"', '').replace('"', '');
    //            transporter.sendMail({
    //                from: 'notificacion@busanc.cl',
    //                to: fase2,
    //                subject: 'Se ha iniciado el registro de validación de diseño y desarrollo para el  nuevo proyecto : ' + resultado[204],
    //                text: 'Numero de Solcitud: ' + resultado[1] + '\nNombre del Cliente: ' + resultado[202] + '\nNombre del Proyecto: ' + resultado[201] + '\nFecha de Inicio: ' + resultado[203] + '\nCodigo Proyecto: ' + resultado[204],
    //            }, function (error, response) {
    //                if (error) {
    //                    console.log(error);
    //                } else {
    //                    console.log('Message sent');
    //                }
    //            });
    //        })
    //        conn.close();
    //    }).catch(function (err) { console.log(err); conn.close(); });
    //}).catch(function (err) { console.log(err); });


    res.redirect('/registros.html');
});



module.exports = router;