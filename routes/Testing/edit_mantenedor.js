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


function checkAuth(req, res, next) {
    if (!req.session.ID) {
        res.send('No esta autorizado para ver esta pagina');
    } else {
        next();
    }
}

var ID;

router.get('/editar/*', checkAuth, function (req, res) {
    var Url = req.originalUrl;
    ID = Url.replace('/edit_mantenedor.html/editar/', '');
    //res.send(Url)
    

    res.redirect('/edit_mantenedor.html');
});


/* GET home page. */
router.get('/', checkAuth, function (req, res) {
    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query("select * from Usuarios where id = " + ID +";").then(function (recordset) {
            nombre1 = JSON.stringify(recordset[0].Nombre).replace('"', '');
            nombre1 = nombre1.replace('"', '');
            apellido1 = JSON.stringify(recordset[0].Apellido).replace('"', '');
            apellido1 = apellido1.replace('"', '');
            correo1 = JSON.stringify(recordset[0].Correo).replace('"', '');
            correo1 = correo1.replace('"', '');
            res.render('edit_mantenedor', {
                title: ID,
                nombre: nombre1,
                apellido: apellido1,
                correo: correo1,
                cuentas: JSON.stringify(recordset[0].Cuentas),
                vpermiso0: JSON.stringify(recordset[0].Permiso0),
                vpermiso1: JSON.stringify(recordset[0].Permiso1),
                vpermiso2_1: JSON.stringify(recordset[0].Permiso2_1),
                vpermiso2_2: JSON.stringify(recordset[0].Permiso2_2),
                vpermiso3_1: JSON.stringify(recordset[0].Permiso3_1),
                vpermiso3_2: JSON.stringify(recordset[0].Permiso3_2),
                vpermiso4: JSON.stringify(recordset[0].Permiso4),
                vpermiso5: JSON.stringify(recordset[0].Permiso5),
                vpermiso6: JSON.stringify(recordset[0].Permiso6),
                vpermiso7: JSON.stringify(recordset[0].Permiso7),
                vpermiso8: JSON.stringify(recordset[0].Permiso8),
                vpermiso9: JSON.stringify(recordset[0].Permiso9),
                vpermiso10: JSON.stringify(recordset[0].Permiso10)
            });
            conn.close();
        }).catch(function (err) {console.log(err);conn.close();});
    }).catch(function (err) { console.log(err); });


});

router.post('/alter', checkAuth, function (req, res) {

    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var correo = req.body.correo;
    if (req.body.cuentas != 1) { var cuentas = 0; } else { var cuentas = 1; };
    if (req.body.p0 != 1) { var p0 = 0; } else { var p0 = 1; };
    if (req.body.p1 != 1) { var p1 = 0; } else { var p1 = 1; };
    if (req.body.p2_1 != 1) { var p2_1 = 0; } else { var p2_1 = 1; };
    if (req.body.p2_2 != 1) { var p2_2 = 0; } else { var p2_2 = 1; };
    if (req.body.p3_1 != 1) { var p3_1 = 0; } else { var p3_1 = 1; };
    if (req.body.p3_2 != 1) { var p3_2 = 0; } else { var p3_2 = 1; };
    if (req.body.p4 != 1) { var p4 = 0; } else { var p4 = 1; };
    if (req.body.p5 != 1) { var p5 = 0; } else { var p5 = 1; };
    if (req.body.p6 != 1) { var p6 = 0; } else { var p6 = 1; };
    if (req.body.p7 != 1) { var p7 = 0; } else { var p7 = 1; };
    if (req.body.p8 != 1) { var p8 = 0; } else { var p8 = 1; };
    if (req.body.p9 != 1) { var p9 = 0; } else { var p9 = 1; };
    if (req.body.p10 != 1) { var p10 = 0; } else { var p10 = 1; };

    //UPDATE Indice SET Proyecto= 'Proyecto1'WHERE Id= 1;
    var querysalida = "UPDATE Usuarios SET Nombre= '" + nombre + "', Apellido = '" + apellido + "', Correo = '" + correo + "', Cuentas = "+ cuentas +" , Permiso0 = " + p0 + ", Permiso1 = " + p1 + ", Permiso2_1 = " + p2_1 + ", Permiso2_2 = " + p2_2 + ", Permiso3_1 = " + p3_1 + ", Permiso3_2 = " + p3_2 + ", Permiso4 = " + p4 + ", Permiso5 = " + p5 + ", Permiso6 = " + p6 + ", Permiso7 = " + p7 + ", Permiso8 = " + p8 + ", Permiso9 = " + p9 + ", Permiso10 = " + p10 +"     WHERE Id= "+ ID + "; ";
    console.log('----------inicio--------');
    console.log(querysalida);
    console.log('----------final--------');

    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(querysalida).then(function (recordset) {
            conn.close();
        }).catch(function (err) {console.log(err);conn.close();});
    }).catch(function (err) { console.log(err);});

    res.redirect('/mantenedores.html');
});

module.exports = router;