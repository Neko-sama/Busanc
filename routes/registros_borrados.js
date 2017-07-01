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
    permiso10= req.session.permiso10;
    if (!req.session.ID) {
        res.send('No esta autorizado para ver esta pagina');
    } else {
        req.session.registro = 0;
        next();
    }
}

router.get('/', checkAuth,  function (req, res) {
    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query("select * from Solicitud where borrado_suave = 1;").then(function (recordset) {
            req.query("select * from Indice where borrado_suave = 1;").then(function (query2) {

                var x = recordset.length;
                var ids = [];
                var Fechas_ingreso = [];
                var Fechas_modificacion = [];
                var Nombres_proyecto = [];
                var Nombres_cliente = [];
                var Areas = [];
                var Fechas_visita = [];
                var Codigo = [];
                var Proyecto = [];
                var Creado_por = [];



                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Id).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    ids.push(resultado);
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Fecha_modificacion).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    Fechas_modificacion.push(resultado);
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Nombre_proyecto).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    Nombres_proyecto.push(resultado);
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Nombre_cliente).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    Nombres_cliente.push(resultado);
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Area).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    Areas.push(resultado);
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(query2[flag].Fecha_ingreso).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    Fechas_ingreso.push(resultado);
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(query2[flag].Codigo).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    Codigo.push(resultado);
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(query2[flag].Proyecto).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    Proyecto.push(resultado);
                    console.log(Proyecto[flag])
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(query2[flag].Creado_por).replace('"', '').replace('"', '').replace('""', '').replace('/', '')
                    Creado_por.push(resultado);
                    console.log(Proyecto[flag])
                }


                res.render('registros_borrados', {
                    title: 'REGISTROS BORRADOS',
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
                    arr_ids: ids,
                    arr_fechas_ing: Fechas_ingreso,
                    arr_fechas_mod: Fechas_modificacion,
                    arr_nombres_pro: Nombres_proyecto,
                    arr_nombres_cli: Nombres_cliente,
                    arr_codigo: Codigo,
                    arr_fechas_vis: Fechas_visita,
                    arr_proyecto : Proyecto,
                    arr_creacion : Creado_por
                });
                conn.close();
            }).catch(function (err) { console.log(err); conn.close(); });
        }).catch(function (err) {console.log(err);conn.close();});
    }) .catch(function (err) {console.log(err); });
});

module.exports = router;