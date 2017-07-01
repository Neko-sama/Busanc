var express = require('express');
var router = express.Router();
var session = require('express-session');


var sql = require("mssql");

var dbConfig = {
    server: "200.75.0.112",
    database: "busanc",
    user: "admin14",
    password: "2422",
    port: 1433

};


var nombres = [];
var apellidos = [];
var correos = [];
var ids = [];
var cuentas = [];
var permiso0 = [];
var permiso1 = [];
var permiso2_1 = [];
var permiso2_2 = [];
var permiso3_1 = [];
var permiso3_2 = [];
var permiso4 = [];
var permiso5 = [];
var permiso6 = [];
var permiso7 = [];
var permiso8 = [];
var permiso9 = [];
var permiso10 = [];

function checkAuth(req, res, next) {
    vcuentas = req.session.cuentas;
    vpermiso0 = req.session.permiso0;
    vpermiso1 = req.session.permiso1;
    if (!req.session.ID) {
        res.send('No esta autorizado para ver esta pagina');
    } else if (req.session.cuentas === 0) {
        res.send('No esta autorizado para editar cuentas');
    } else {
        next();
    }
}


router.get('/borrar/*', function (req, res) {
    var Url = req.originalUrl;
    Url = Url.replace('/mantenedores_borrados.html/borrar/', ''); 
    //res.send(Url);
    var deletequery = "update Usuarios set borrado_suave = 1 where id ='" + Url + "';";
    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(deletequery).then(function () {
            res.redirect('/mantenedores.html');
        });
    });
});

router.get('/', checkAuth, function (req, res) {
    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query("select * from Usuarios where borrado_suave = 1;").then(function (recordset) {

            var x = recordset.length;

            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Nombre)
                nombres.push(resultado);
            }

            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Apellido)
                apellidos.push(resultado);
            }

            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Correo)
                correos.push(resultado);
            }

            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Id)
                ids.push(resultado);
            }

            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Cuentas)
                cuentas.push(resultado);
            }

            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Permiso0)
                permiso0.push(resultado);
            }

            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Permiso1)
                permiso1.push(resultado);
            }

            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Permiso2_1)
                permiso2_1.push(resultado);
            }
            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Permiso2_2)
                permiso2_2.push(resultado);
            }
            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Permiso3_1)
                permiso3_1.push(resultado);
            }
            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Permiso3_2)
                permiso3_2.push(resultado);
            }
            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Permiso4)
                permiso4.push(resultado);
            }
            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Permiso5)
                permiso5.push(resultado);
            }
            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Permiso6)
                permiso6.push(resultado);
            }
            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Permiso7)
                permiso7.push(resultado);
            }
            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Permiso8)
                permiso8.push(resultado);
            }
            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Permiso9)
                permiso9.push(resultado);
            }
            for (var flag = 0; flag < x; flag++) {
                resultado = JSON.stringify(recordset[flag].Permiso10)
                permiso10.push(resultado);
            }
            res.render('mantenedores_borrados', {
                num : x,
                title: 'Mantenedores_borrados',
                vcuentas: vcuentas,
                vpermiso0: vpermiso0,
                vpermiso1: vpermiso1,
                arr_nombres: nombres,
                arr_apellidos: apellidos,
                arr_correos: correos,
                arr_ids: ids,
                arr_cuentas: cuentas,
                arr_permiso0: permiso0,
                arr_permiso1: permiso1,
                arr_permiso2_1: permiso2_1,
                arr_permiso2_2: permiso2_2,
                arr_permiso3_1: permiso3_1,
                arr_permiso3_2: permiso3_2,
                arr_permiso4: permiso4,
                arr_permiso5: permiso5,
                arr_permiso6: permiso6,
                arr_permiso7: permiso7,
                arr_permiso8: permiso8,
                arr_permiso9: permiso9,
                arr_permiso10: permiso10
            });
            conn.close();
        })
            .catch(function (err) {
                console.log(err);
                conn.close();
            });
    })
        .catch(function (err) {
            console.log(err);
        });
});

router.post('/crear', function (req, res) {

    
    

    
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var correo = req.body.correo;
    var pass = req.body.pass;

    var querysalida = "INSERT INTO  Usuarios (borrado_suave, Nombre, Apellido, Correo, Password) Values  (0, '" + nombre + "', '" + apellido + "', '" + correo + "', " + pass + "); ";
    
    //console.log(querysalida);

    //res.send(querysalida);

    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(querysalida).then(function (recordset) {
            conn.close();
        }).catch(function (err) {
            console.log(err);
            conn.close();
        });
    })
        .catch(function (err) {
            console.log(err);
        });

    res.redirect('/mantenedores.html');

});


module.exports = router;
