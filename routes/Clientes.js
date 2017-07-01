var express = require('express');
var router = express.Router();
var session = require('express-session');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var app = express();
var sql = require("mssql");



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
var nombre_vendedor;



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
    nombre_vendedor = req.session.nombre.replace('"', '').replace('"', '').replace('"', '').replace('"', '');

    if (!req.session.ID) {
        res.send('No esta autorizado para ver esta pagina');
    } else {
        next();
    }
}


/* GET home page. */
router.get('/', checkAuth, function (req, res) {
    var x;
    var clientes = [];
    var cod_clientes = [];
    var Creadores = [];

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

            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Cod_cli).replace('"', '').replace('"', '')
                cod_clientes.push(resultado);
            }

            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Creador).replace('"', '').replace('"', '')
                Creadores.push(resultado);
            }

            res.render('Clientes', {
                title: 'Clientes',
                nombre:nombre_vendedor,
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
                arr_cod_clientes: cod_clientes,
                arr_creadores: Creadores
            });
            conn.close();
        }).catch(function (err) { console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err); });  
});


router.post('/agregar', checkAuth, function (req, res) {
    var n_cliente = req.body.ncliente;
    var persona = nombre_completo = req.session.nombre.replace('"', '').replace('"', '').replace('"', '').replace('"', '');
    console.log(n_cliente)
    console.log(persona)
    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query("insert into Clientes (Nombre_cliente, Creador) Values ('" + n_cliente + "', '" + persona +"');").then(function (recordset) {

            conn.close();
        }).catch(function (err) { console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err); }); 
    res.redirect('/clientes'); 
})


module.exports = router;