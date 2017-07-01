var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var sql = require("mssql");


var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(''));
app.use(logger('dev'));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));

app.use(session({
    secret: 'oli',
    resave: false,
    saveUninitialized: false,
    cookie: {}
}))

var dbConfig = {
    server: "200.75.0.112",
    database: "busanc",
    user: "admin14",
    password: "2422",
    port: 1433
};

var cantidad_datos
var BDcorreos = [];
var BDpass = [];
var BDid = [];
var BDnombre = [];
var BDapellido = [];

app.post('/login', function (req, res) {
    
    var post = req.body
    var entro = true
    correo_ingresado = '"' + post.correo + '"';
    pass_ingresado = '"' + post.pass + '"';

    for (var flag = 0; flag < cantidad_datos; flag++) {
        if (correo_ingresado === BDcorreos[flag] && pass_ingresado === BDpass[flag]) {
            entro = false;
            req.session.ID = BDid[flag];
            req.session.correo=BDcorreos[flag];
            req.session.registro = 0;
            req.session.nombre = (BDnombre[flag] + " " + BDapellido[flag])
            res.redirect('./redirect/permisos');
            break;
        } 
    }
    if (entro) { res.send('Usuario o Password Erroneos'); }
    

});

var clientes = require('./routes/Clientes');
var correos = require('./routes/correos');
var redirect = require('./routes/redirect');
var editar_registros = require('./routes/editar_registros');
var edit_mant = require('./routes/edit_mantenedor');
var login = require('./routes/login');
var routes1 = require('./routes/index');
var registros = require('./routes/registros');
var registros_borrados = require('./routes/registros_borrados');
var mantenedores = require('./routes/mantenedores');
var mantenedores_borrados = require('./routes/mantenedores_borrados');
var modificacion = require('./routes/modificacion');
var test = require('./routes/test');
var editar_solicitud = require('./routes/editar_solicitud');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    req.session.ID = null;
    req.session.correo= null;
    req.session.registro = null;
    BDcorreos = [];
    BDpass = [];
    BDid = [];
    BDnombre = [];
    BDapellido = [];
    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(
            "select * from Usuarios;"
        ).then(function (recordset) {
            cantidad_datos = recordset.length;

            for (var flag = 0; flag < cantidad_datos; flag++) {
                resultado = JSON.stringify(recordset[flag].Id)
                BDid.push(resultado);
                //console.log(BDid[flag])
            }

            for (var flag = 0; flag < cantidad_datos; flag++) {
                resultado = JSON.stringify(recordset[flag].Correo)
                BDcorreos.push(resultado);
                //console.log(BDcorreos[flag])
            }

            for (var flag = 0; flag < cantidad_datos; flag++) {
                resultado = JSON.stringify(recordset[flag].Password)
                BDpass.push(resultado);
                //console.log(BDpass[flag])
            } 
            for (var flag = 0; flag < cantidad_datos; flag++) {
                resultado = JSON.stringify(recordset[flag].Nombre)
                BDnombre.push(resultado);
                //console.log(BDpass[flag])
            } 
            for (var flag = 0; flag < cantidad_datos; flag++) {
                resultado = JSON.stringify(recordset[flag].Apellido)
                BDapellido.push(resultado);
                //console.log(BDpass[flag])
            }   
            res.render('login');
            conn.close();
        }).catch(function (err) {
            console.log(err);
            conn.close();
        });
    })
        .catch(function (err) {
            console.log(err);
        });

    
});

app.use('/clientes', clientes);
app.use('/editar_solicitud', editar_solicitud);
app.use('/correos', correos);
app.use('/correos.html', correos);
app.use('/redirect', redirect);
app.use('/test', test);
app.use('/index.html', routes1);
app.use('/registros.html', registros);
app.use('/registros_borrados.html', registros_borrados);
app.use('/mantenedores.html', mantenedores);
app.use('/mantenedores_borrados.html', mantenedores_borrados);
app.use('/modificacion.html', modificacion);
app.use('/edit_mantenedor.html', edit_mant);
app.use('/editar_registros.html', editar_registros);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.post('/myaction', function (req, res) {
    res.send('You sent the name "' + req.body.name + '".');
});

module.exports = app;
