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
var pag_actual;
pag_actual = 1;

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
    nombre_completo = req.session.nombre;
    if (!req.session.ID) {
        res.send('No esta autorizado para ver esta pagina');
    } else {
        req.session.registro = 0;
        next();
    }
}

router.post('/buscar', checkAuth, function (req, res) {
    var id_busqueda = req.body.buscador_id;
    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query("SELECT Indice2.Id, Indice2.Estado, Solicitud2.Fecha_modificacion, Solicitud2.nombre_vendedor, Indice2.Proyecto, Indice2.Codigo, Indice2.Fecha_ingreso, Solicitud2.Area, Solicitud2.Nombre_cliente, Solicitud2.Nombre_proyecto FROM Solicitud2 INNER JOIN Indice2 ON Indice2.Id = Solicitud2.Id Order by Indice2.Id;").then(function (recordset) {

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
                var Estados = [];
                var buscador_nombre = [];
                var paginas;

                paginas = x / 10;
                paginas = Math.ceil(paginas);

                var busqueda;
                for (var i = 0; i < x; i++) {
                    if (recordset[i].Id == id_busqueda) {
                        busqueda = recordset[i]
                        busqueda.Proyecto = JSON.stringify(busqueda.Proyecto).replace('"', '').replace('"', '')
                        busqueda.Codigo = JSON.stringify(busqueda.Codigo).replace('"', '').replace('"', '')
                        busqueda.Fecha_ingreso = JSON.stringify(busqueda.Fecha_ingreso).replace('T00:00:00.000Z', '').replace('"', '').replace('"', '')
                        busqueda.Fecha_modificacion = JSON.stringify(busqueda.Fecha_modificacion).replace('T00:00:00.000Z', '').replace('"', '').replace('"', '')
                        console.log(busqueda)
                    }
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Id).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    ids.push(resultado);
                    //console.log(ids[flag])
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Estado).replace('"', '').replace('"', '')
                    Estados.push(resultado);
                    //console.log(Estados[flag])
                }


                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Fecha_modificacion).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    Fechas_modificacion.push(resultado);

                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Nombre_proyecto).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    Nombres_proyecto.push(resultado);
                    //console.log(Nombres_proyecto[flag])
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Nombre_cliente).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    Nombres_cliente.push(resultado);
                    //console.log(Nombres_cliente[flag])
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Area).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    Areas.push(resultado);
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Fecha_ingreso).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    Fechas_ingreso.push(resultado);
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Codigo).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    Codigo.push(resultado);
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Proyecto).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    Proyecto.push(resultado);
                    //console.log(Proyecto[flag])
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].nombre_vendedor).replace('"', '').replace('"', '').replace('""', '').replace('/\//g', '')
                    Creado_por.push(resultado);
                    //console.log(Proyecto[flag])
                }

                for (var flag = 0; flag < x; flag++) {
                    if (Proyecto[flag] != 'null' && Proyecto[flag] != 'NAP') {
                        //console.log(Proyecto[flag])
                        buscador_nombre.push([ids[flag], Proyecto[flag]]);
                    }

                    //buscador_nombre
                }
                var largo_buscador = buscador_nombre.length;
                //console.log(buscador_nombre)
                //console.log(buscador_nombre[0])
                //console.log(buscador_nombre[0][0])
                //console.log(buscador_nombre[0][1])

                //console.log(permiso0);
                //console.log(permiso1);
                //console.log(permiso21);
                //console.log(permiso22);
                //console.log(permiso31);
                //console.log(permiso32);
                //console.log(permiso4);
                //console.log(permiso5);
                //console.log(permiso6);
                //console.log(permiso7);
                //console.log(permiso8);
                //console.log(permiso9);
                //console.log(permiso10);
                res.render('registros', {
                    title: 'REGISTROS',
                    nombre_completo: nombre_completo.replace('"', '').replace('"', '').replace('""', '').replace('"', '').replace('"', '').replace('""', ''),
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
                    pageCount: paginas,
                    currentPage: pag_actual,
                    arr_ids: ids,
                    arr_fechas_ing: Fechas_ingreso,
                    arr_fechas_mod: Fechas_modificacion,
                    arr_nombres_pro: Nombres_proyecto,
                    arr_nombres_cli: Nombres_cliente,
                    arr_codigo: Codigo,
                    arr_fechas_vis: Fechas_visita,
                    arr_proyecto: Proyecto,
                    arr_creacion: Creado_por,
                    arr_estados: Estados,
                    arr_buscador: buscador_nombre,
                    num2: largo_buscador,
                    buscado: 1,
                    busqueda: busqueda
                });
                conn.close();
        }).catch(function (err) { console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err); });

});

router.get('/page=*', checkAuth, function (req, res) {

    var Url = req.originalUrl;
    seccion = Url.replace('/registros.html/page=', '');
    pag_actual = seccion;
    console.log('seccion')
    console.log(seccion)
    //res.send(ID)
    res.redirect('/registros.html');
});

router.get('/', checkAuth,  function (req, res) {
    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query("select * from Solicitud2 where borrado_suave = 0 Order by Id;").then(function (recordset) {
            req.query("select * from Indice2  where borrado_suave = 0 Order by Id;").then(function (query2) {

                var x = recordset.length;
                //console.log (x)
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
                var Estados = [];
                var buscador_nombre = [];
                var paginas;
                
                paginas = x / 10;
                paginas = Math.ceil(paginas);

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Id).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    ids.push(resultado);
                    //console.log(ids[flag])
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(query2[flag].Estado).replace('"', '').replace('"', '')
                    Estados.push(resultado);
                    //console.log(Estados[flag])
                }


                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Fecha_modificacion).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    Fechas_modificacion.push(resultado);

                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Nombre_proyecto).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    Nombres_proyecto.push(resultado);
                    //console.log(Nombres_proyecto[flag])
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].Nombre_cliente).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                    Nombres_cliente.push(resultado);
                    //console.log(Nombres_cliente[flag])
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
                    //console.log(Proyecto[flag])
                }

                for (var flag = 0; flag < x; flag++) {
                    resultado = JSON.stringify(recordset[flag].nombre_vendedor).replace('"', '').replace('"', '').replace('""', '').replace('/\//g', '')
                    Creado_por.push(resultado);
                    //console.log(Proyecto[flag])
                }

                for (var flag = 0; flag < x; flag++) {
                    if (Proyecto[flag] != 'null' && Proyecto[flag] != 'NAP') {
                        //console.log(Proyecto[flag])
                        buscador_nombre.push([ids[flag], Proyecto[flag]]);
                    }

                    //buscador_nombre
                }
                var largo_buscador = buscador_nombre.length;
                //console.log(buscador_nombre)
                //console.log(buscador_nombre[0])
                //console.log(buscador_nombre[0][0])
                //console.log(buscador_nombre[0][1])

                //console.log(permiso0);
                //console.log(permiso1);
                //console.log(permiso21);
                //console.log(permiso22);
                //console.log(permiso31);
                //console.log(permiso32);
                //console.log(permiso4);
                //console.log(permiso5);
                //console.log(permiso6);
                //console.log(permiso7);
                //console.log(permiso8);
                //console.log(permiso9);
                //console.log(permiso10);
                res.render('registros', {
                    title: 'REGISTROS',
                    nombre_completo: nombre_completo.replace('"', '').replace('"', '').replace('""', '').replace('"', '').replace('"', '').replace('""', ''),
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
                    pageCount: paginas,
                    currentPage: pag_actual,
                    arr_ids: ids,
                    arr_fechas_ing: Fechas_ingreso,
                    arr_fechas_mod: Fechas_modificacion,
                    arr_nombres_pro: Nombres_proyecto,
                    arr_nombres_cli: Nombres_cliente,
                    arr_codigo: Codigo,
                    arr_fechas_vis: Fechas_visita,
                    arr_proyecto : Proyecto,
                    arr_creacion: Creado_por,
                    arr_estados: Estados,
                    arr_buscador: buscador_nombre,
                    num2: largo_buscador,
                    buscado: 0
                });
                conn.close();
            }).catch(function (err) { console.log(err); conn.close(); });
        }).catch(function (err) {console.log(err);conn.close();});
    }) .catch(function (err) {console.log(err); });
});

module.exports = router;