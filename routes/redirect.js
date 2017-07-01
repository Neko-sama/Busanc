var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var htmlToPdf = require('html-to-pdf');
var path = require('path');

var app = express();
var sql = require("mssql");

var dbConfig = {
    server: "200.75.0.112",
    database: "busanc",
    user: "admin14",
    password: "2422",
    port: 1433

};

router.get('/editar_solicitud', function (req, res) {
    setTimeout(function () {
        res.redirect('/editar_solicitud');
    }, 1500);

});

router.get('/modificacion', function (req, res) {
    setTimeout(function () {
        res.redirect('/modificacion.html');
    }, 1500);

});

router.get('/registro/*', function (req, res) {
    var ID;
    var Url = req.originalUrl;
    ID = Url.replace('/redirect/registro/', '');
    htmlToPdf.convertHTMLFile("./public/html/Registro_Validacion-" + ID + ".html", "./public/pdf/Registro_Validacion-" + ID + ".pdf",
        function (error, success) {
            if (error) {
                console.log('Oh noes! Errorz!');
                alert(error);
            } else {
                console.log('Registro Creado');
                res.download('./public/pdf/Registro_Validacion-' + ID + '.pdf');
            }
        }
    );
        //res.send(ID)
    
});

router.get('/solicitud/*', function (req, res) {
    var ID;
    var Url = req.originalUrl;
    ID = Url.replace('/redirect/solicitud/', '');
    htmlToPdf.convertHTMLFile("./public/html/Solicitud_Cliente-" + ID + ".html", "./public/pdf/Solicitud_Cliente-" + ID + ".pdf",
        function (error, success) {
            if (error) {
                console.log('Oh noes! Errorz!');
                alert(error);
            } else {
                console.log('Solicitud Creada');
                res.download('./public/pdf/Solicitud_Cliente-' + ID + '.pdf');
            }
        }
    );
    //res.send(ID)

});



router.get('/mantenedores', function (req, res) {
    setTimeout(function() {
        res.redirect('/mantenedores.html');
}, 1000);
    
});


router.get('/create_registro', function (req, res) {
    setTimeout(function() {
        res.redirect('/registros.html');
}, 3000);
    
});


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


router.get('/permisos', function (req, res) {
    var ID;
    ID = req.session.ID;
    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query("select * from Usuarios where Id=" + ID + ";").then(function (recordset) {
            
            cuentas = JSON.stringify(recordset[0].Cuentas);
            permiso0 = JSON.stringify(recordset[0].Permiso0);
            permiso1 = JSON.stringify(recordset[0].Permiso1);
            permiso21 = JSON.stringify(recordset[0].Permiso2_1);
            permiso22 = JSON.stringify(recordset[0].Permiso2_2);
            permiso31 = JSON.stringify(recordset[0].Permiso3_1);
            permiso32 = JSON.stringify(recordset[0].Permiso3_2);
            permiso4 = JSON.stringify(recordset[0].Permiso4);
            permiso5 = JSON.stringify(recordset[0].Permiso5);
            permiso6 = JSON.stringify(recordset[0].Permiso6);
            permiso7 = JSON.stringify(recordset[0].Permiso7);
            permiso8 = JSON.stringify(recordset[0].Permiso8);
            permiso9 = JSON.stringify(recordset[0].Permiso9);
            permiso10 = JSON.stringify(recordset[0].Permiso10);
            
           


            res.redirect('/redirect/asignar');

            conn.close();
            }).catch(function (err) {console.log(err);conn.close(); });
    }).catch(function (err) {console.log(err);});
});

router.get('/asignar', function (req, res) {
    
    if (cuentas == "true") { req.session.cuentas = 1 } else if (cuentas == "false") { req.session.cuentas = 0;}
    if (permiso0 == "true") { req.session.permiso0 = 1 } else if (permiso0 == "false") { req.session.permiso0 = 0; }
    if (permiso1 == "true") { req.session.permiso1 = 1 } else if (permiso1 == "false") { req.session.permiso1 = 0; }
    if (permiso21 == "true") { req.session.permiso21 = 1 } else if (permiso21 == "false") { req.session.permiso21 = 0; }
    if (permiso22 == "true") { req.session.permiso22 = 1 } else if (permiso22 == "false") { req.session.permiso22 = 0; }
    if (permiso31 == "true") { req.session.permiso31 = 1 } else if (permiso31 == "false") { req.session.permiso31 = 0; }
    if (permiso32 == "true") { req.session.permiso32 = 1 } else if (permiso32 == "false") { req.session.permiso32 = 0; }
    if (permiso4 == "true") { req.session.permiso4 = 1 } else if (permiso4 == "false") { req.session.permiso4 = 0; }
    if (permiso5 == "true") { req.session.permiso5 = 1 } else if (permiso5 == "false") { req.session.permiso5 = 0; }
    if (permiso6 == "true") { req.session.permiso6 = 1 } else if (permiso6 == "false") { req.session.permiso6 = 0; }
    if (permiso7 == "true") { req.session.permiso7 = 1 } else if (permiso7 == "false") { req.session.permiso7 = 0; }
    if (permiso8 == "true") { req.session.permiso8 = 1 } else if (permiso8 == "false") { req.session.permiso8 = 0; }
    if (permiso9 == "true") { req.session.permiso9 = 1 } else if (permiso9 == "false") { req.session.permiso9 = 0; }
    if (permiso10 == "true") { req.session.permiso10 = 1 } else if (permiso10 == "false") { req.session.permiso10 = 0; }

    res.redirect('/registros.html');
});


module.exports = router;