var express = require('express');
var router = express.Router();
//var bodyParser = require('body-parser');
var session = require('express-session');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var app = express();
var sql = require("mssql");
//var busboy = require('connect-busboy');
var multer = require('multer');

var upload = multer(); // for parsing multipart/form-data

var Dropbox = require('dropbox');
var dbx = new Dropbox({ accessToken: 'QhwatnYy40gAAAAAAAAFahu1gBwMv-8HO99x8PFPeOPisdjp81X7psRhQkCdcJfr' });
//dbx.filesListFolder({ path: '' })
//    .then(function (response) {
//        console.log(response);
//    })
//    .catch(function (error) {
//        console.log(error);
//    });



var dbConfig = {
    server: "200.75.0.112",
    database: "busanc",
    user: "admin14",
    password: "2422",
    port: 1433

};

var transporter = nodemailer.createTransport(smtpTransport({
    host: 'mail.busanc.cl',
    port: 25,
    auth: {
        user: 'notificacion@busanc.cl',
        pass: 'not.2017'
    }
}));

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
var nombre_vendedor;

function checkAuth(req, res, next) {
    
    cuentas = req.session.cuentas;
    permiso0= req.session.permiso0;
    permiso1= req.session.permiso1;
    permiso21= req.session.permiso21;
    permiso22= req.session.permiso22;
    permiso31= req.session.permiso31;
    permiso32= req.session.permiso32;
    permiso4= req.session.permiso4;
    permiso5= req.session.permiso5;
    permiso6= req.session.permiso6;
    permiso7= req.session.permiso7;
    permiso8= req.session.permiso8;
    permiso9= req.session.permiso9;
    permiso10 = req.session.permiso10;
    nombre_vendedor = req.session.nombre.replace('"', '').replace('"', '').replace('"', '').replace('"', '');

    if (!req.session.ID) {
        res.send('No esta autorizado para ver esta pagina');
    } else {
        next();
    }
}

//app.use(bodyParser.urlencoded({
//    extended: true
//}));

//app.use(bodyParser.json());
var x;
var clientes = [];
var cod_clientes = [];
/* GET home page. */
router.get('/', checkAuth, function (req, res) {
    clientes = [];
    cod_clientes = [];
    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query("select * from Clientes").then(function (recordset) {
            x = recordset.length;
            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Nombre_cliente).replace('"', '').replace('"', '')
                clientes.push(resultado);
            }
            //console.log(clientes)
            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Cod_cli).replace('"', '').replace('"', '')
                cod_clientes.push(resultado);
            }
            //console.log(cod_clientes)
            res.render('index', { 
                title: 'INDEX',
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
                num: x,
                arr_clientes: clientes,
                arr_cod_clientes: cod_clientes 
            });
            conn.close();
        }).catch(function (err) {console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err);});  
});

var cpUpload = upload.fields([{ name: 'fot3', maxCount: 1 }, { name: 'levmed3', maxCount: 1 }, { name: 'plaadj3', maxCount: 1 }, { name: 'mailres3', maxCount: 5 }, { name: 'muefis3', maxCount: 1 }])
var last_ID = 0
var megainsert = ''
var fechai = ''
var ncliente = ''
var nproyecto = ''
var vendedor = ''
function basedatos(_callback) {
    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(megainsert).then(function (recordset) {
            req.query("select TOP 1 ID from Indice2 Order by ID DESC;").then(function (last_id) {
                last_ID = last_id[0].ID
                conn.close();
            })
            req.query("select * from Correos2 where id = 1;").then(function (correos) {
                fase1 = JSON.stringify(correos[0].Fase3).replace('"', '').replace('"', '');
                transporter.sendMail({
                    from: 'notificacion@busanc.cl',
                    to: fase1,
                    subject: 'Se ha generado una nueva solicitud de cliente : ' + last_ID,
                    //Numero solicitud, Nombre Cliente , Nombre Proyecto , Nombre Vendedor y Fecha.
                    text: 'Numero de Solcitud: ' + last_ID + '\nNombre del Cliente: ' + ncliente + '\nNombre del Proyecto: ' + nproyecto + '\nCorreo del Vendedor: ' + vendedor + '\nFecha de Inicio: ' + fechai,
                }, function (error, response) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Message sent');
                    }
                });
            })
        })

            .catch(function (err) {
                console.log(err);
            });


        conn.connect().then(function () {
            var req = new sql.Request(conn);

        })

    }).catch(function (err) { console.log(err); });
    _callback();
}
function llamada() {
    basedatos(function () {
        
    });
}

router.post('/', cpUpload, function (req, res) {
    nproyecto = req.body.nproyecto;
    ncliente = req.body.ncliente;
    vendedor = req.session.correo.replace('"', '').replace('"', '')

    var fecham = req.body.fecham
    var area = req.body.area
    var fechav = req.body.fechav
    var descrip = req.body.descrip
    var reqfun = req.body.reqfun
    var reqdes = req.body.reqdes
    var reqnor = req.body.reqnor
    var reqleg = req.body.reqleg
    var reqreg = req.body.reqreg
    var fot = req.body.fot
    var muefis = req.body.muefis
    var levmed = req.body.levmed
    var plaadj = req.body.plaadj
    var mailres = req.body.mailres
    var fot_obs = req.body.fot_obs
    var muefis_obs = req.body.muefis_obs
    var levmed_obs = req.body.levmed_obs
    var plaadj_obs = req.body.plaadj_obs
    var mailres_obs = req.body.mailres_obs
    var esptec = req.body.esptec
    var potfal = req.body.potfal

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }

    //fechai = mm + '/' + dd + '/' + yyyy;
    var fechai = req.body.fechai

    for (var flag = 0; flag < x; flag++) {
        if (ncliente == clientes[flag]) {
            var cod_cliente = cod_clientes[flag]
        }
    }

    if (fot == 1) {
        var fotpor = req.body.fotpor;
        var fotfecha = "'" + fechai.toString() + "'"
    } else {
        var fotpor = 'NAP'
        var fotfecha = null
    }

    if (muefis == 1) {
        var muefispor = req.body.muefispor
        var muefisfecha = "'" + fechai.toString() + "'"
    } else {
        var muefispor = 'NAP'
        var muefisfecha = null
    } 

    if (levmed == 1) {
        var levmedpor = req.body.levmedpor;
        var levmedfecha = "'" + fechai.toString() + "'"
    } else {
        var levmedpor = 'NAP'
        var levmedfecha = null
    }

    if (plaadj == 1) {
        var plaadjpor = req.body.plaadjpor;
        var plaadjfecha = "'" + fechai.toString() + "'"
    } else {
        var plaadjpor = 'NAP'
        var plaadjfecha = null
    }

    if (mailres == 1) {
        var mailrespor = req.body.mailrespor;
        var mailresfecha = "'"+fechai.toString()+"'"
        console.log(mailresfecha)
    } else {
        var mailrespor = 'NAP'
        var mailresfecha = null
    }


    var query1 = "insert into Indice2 (Cliente, Fecha_ingreso, Creado_por) values ('" + ncliente+"', '"+fechai+"','" + req.session.correo.replace('"', '').replace('"', '') +"') ; ";
    var query2 = "insert into Control_calidad2 DEFAULT VALUES ; ";
    var query3 = "insert into Control_cambios2 (N_revision) values (1) ; ";
    var query4 =  "insert into Cotizacion_proyecto2 DEFAULT VALUES ; ";
    var query5 =  "insert into Desarrollo_proyecto2 DEFAULT VALUES ; ";
    var query6 =  "insert into Despacho_proyecto2 DEFAULT VALUES ; ";
    var query7 =  "insert into Diseno_compuestos2 DEFAULT VALUES ; ";
    var query8 = "insert into Diseno_planos2 DEFAULT VALUES ; ";
    var query9 = "insert into Entradas_proyecto2 values ( '" + reqfun + "', '" + reqdes + "', '" + reqnor + "', '" + reqleg + "', '" + reqreg + "', " + muefis + " , '" + muefispor + "', " + muefisfecha + ", " + fot + ", '" + fotpor + "' , " + fotfecha + ", " + plaadj + ", '" + plaadjpor + "', " + plaadjfecha + "," + levmed + ", '" + levmedpor + "'," + levmedfecha + ", " + mailres + ", '" + mailrespor + "', " + mailresfecha + ",  '"  + esptec + "', '" + potfal + "'); ";
    var query10 = "insert into Planificacion_compuestos2 DEFAULT VALUES ; ";
    var query11 = "insert into Planificacion_planos2 DEFAULT VALUES ; ";
    var query12 = "insert into Validacion_final2 DEFAULT VALUES ; ";
    var query13 = "insert into Validacion_salidas2 DEFAULT VALUES ; ";
    var query14 = "insert into Solicitud2 values (0, null,'"+nombre_vendedor+"', '" + fechai + "', '" + fecham + "', null ,'" + nproyecto + "', '" + ncliente + "', '" + area + "', '" + fechav + "', '" + descrip + "', '" + cod_cliente + "', null, '" + muefis_obs + "', '" + fot_obs + "', '" + plaadj_obs + "', '" + levmed_obs + "'); "

    megainsert = query1 + query2 + query3 + query4 + query5 + query6 + query7 + query8 + query9 +  query10 + query11 + query12 + query13 + query14;

    llamada()

    

    if (levmed == 1 && req.files['levmed3'] != undefined) {
        setTimeout(function () {
            cantidad_datos = req.files['levmed3'].length
            for (var flag = 0; flag < cantidad_datos; flag++) {
                var levmed3 = req.files['levmed3'][flag]
                var levmedBuffer1 = new Buffer(levmed3.buffer, 'base64')
                dbx.filesUpload({ path: '/' + last_ID + '-' + nproyecto +'/Levantamientos_Medidas/' + levmed3.originalname, contents: levmedBuffer1 }).then(function (response) {
                    console.log(response);
                })
                    .catch(function (error) {
                        console.error(error);
                    });
            }
        }, 100);
    }

    if (fot == 1 && req.files['fot3'] != undefined) {
        setTimeout(function () {
            cantidad_datos = req.files['fot3'].length
            for (var flag = 0; flag < cantidad_datos; flag++) {
                var fot3 = req.files['fot3'][flag];
                var fotBuffer = new Buffer(fot3.buffer, 'base64')
                dbx.filesUpload({ path: '/' + last_ID + '-' + nproyecto +'/Fotografias/' + fot3.originalname, contents: fotBuffer }).then(function (response) {
                    console.log(response);
                })
                    .catch(function (error) {
                        console.error(error);
                    });
            }
        }, 500);
    }

    if (plaadj == 1 && req.files['plaadj3'] != undefined) {
        setTimeout(function () {
            cantidad_datos = req.files['plaadj3'].length
            for (var flag = 0; flag < cantidad_datos; flag++) {
                var plaadj3 = req.files['plaadj3'][flag]
                var plaadjBuffer = new Buffer(plaadj3.buffer, 'base64')
                dbx.filesUpload({ path: '/' + last_ID + '-' + nproyecto +'/Planos_adjuntos/' + plaadj3.originalname, contents: plaadjBuffer }).then(function (response) {
                    console.log(response);
                })
                    .catch(function (error) {
                        console.error(error);
                    });
            }
        }, 1000);
    }
    if (mailres == 1 && req.files['mailres3'] != undefined) {
        setTimeout(function () {
            cantidad_datos = req.files['mailres3'].length
            for (var flag = 0; flag < cantidad_datos; flag++) {
                var mailres3 = req.files['mailres3'][flag]
                var mailresBuffer = new Buffer(mailres3.buffer, 'base64')
                dbx.filesUpload({ path: '/' + last_ID + '-' + nproyecto +'/Mail_respaldo/' + mailres3.originalname, contents: mailresBuffer }).then(function (response) {
                    console.log(response);
                })
                    .catch(function (error) {
                        console.error(error);
                    });
            }
        }, 1500);
    }

    if (muefis == 1 && req.files['muefis3'] != undefined) {
        setTimeout(function () {
            cantidad_datos = req.files['muefis3'].length
            for (var flag = 0; flag < cantidad_datos; flag++) {
                var muefis3 = req.files['muefis3'][flag]
                var muefisBuffer1 = new Buffer(muefis3.buffer, 'base64')
                dbx.filesUpload({ path: '/' + last_ID + '-' + nproyecto +'/Muestra_fisica/' + muefis3.originalname, contents: muefisBuffer1 }).then(function (response) {
                    console.log(response);
                })
                    .catch(function (error) {
                        console.error(error);
                    });
            }
        }, 2000);
    }
        

    res.redirect('/redirect/create_registro');


    

});

module.exports = router;