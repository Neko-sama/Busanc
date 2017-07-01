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
        next();
    }
}


/* GET home page. */
router.get('/', checkAuth, function (req, res) {
    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query("select * from Correos where id = 1;").then(function (recordset) {
            fase1 = JSON.stringify(recordset[0].Fase1).replace('"', '').replace('"', '');;
            fase2 = JSON.stringify(recordset[0].Fase2).replace('"', '').replace('"', '');;
            res.render('correos', {
                title: "Correos",
                fase1: fase1,
                fase2: fase2,
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
                vpermiso10: permiso10                
            });
            conn.close();
        }).catch(function (err) {console.log(err);conn.close();});
    }).catch(function (err) { console.log(err); });


});

router.post('/alter', checkAuth, function (req, res) {

    var Fase1 = req.body.correos1;
    var Fase2 = req.body.correos2;

    //UPDATE Indice SET Proyecto= 'Proyecto1'WHERE Id= 1;
    var querysalida = "UPDATE Correos SET Fase1= '" + Fase1 + "', Fase2 = '" + Fase2 + "' where id =1 ";

    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(querysalida).then(function (recordset) {
            conn.close();
        }).catch(function (err) {console.log(err);conn.close();});
    }).catch(function (err) { console.log(err);});

    res.redirect('/registros.html');
});

module.exports = router;