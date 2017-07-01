var express = require('express');
var router = express.Router();
var session = require('express-session');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
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

router.get('/', checkAuth, function (req, res) {
    ID = req.session.registro;
    console.log('ID');
    console.log(ID);
    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);


        req.query("select * from Entradas_proyecto2 where Id= " + ID + ";").then(function (recordset) {
            req.query("select * from Planificacion_planos2 where Id= " + ID + ";").then(function (query2) {
                req.query("select * from Planificacion_compuestos2 where Id= " + ID + ";").then(function (query3) {
                    req.query("select * from Diseno_planos2 where Id= " + ID + ";").then(function (query4) {
                        req.query("select * from Diseno_compuestos2 where Id= " + ID + ";").then(function (query5) {
                            req.query("select * from Cotizacion_proyecto2 where Id= " + ID + ";").then(function (query6) {
                                req.query("select * from Desarrollo_proyecto2 where Id= " + ID + ";").then(function (query7) {
                                    req.query("select * from Control_calidad2 where Id= " + ID + ";").then(function (query8) {
                                        req.query("select * from Despacho_proyecto2 where Id= " + ID + ";").then(function (query9) {
                                            req.query("select * from Validacion_salidas2 where Id= " + ID + ";").then(function (query10) {
                                                req.query("select * from Validacion_final2 where Id= " + ID + ";").then(function (query11) {
                                                    req.query("select * from Control_cambios2 where Id= " + ID + ";").then(function (query12) {
                                                        req.query("select * from Indice2 where Id= " + ID + ";").then(function (query13) {
                                                                
                                                            resultado = [];
                                                            resultado[1] = JSON.stringify(recordset[0].Id).replace('"', '').replace('"', '')
                                                            resultado[2] = JSON.stringify(recordset[0].Requisitos_funcionales).replace('"', '').replace('"', '')
                                                            resultado[3] = JSON.stringify(recordset[0].Requisitos_desempeño).replace('"', '').replace('"', '')
                                                            resultado[4] = JSON.stringify(recordset[0].Requisitos_normativo).replace('"', '').replace('"', '')
                                                            resultado[5] = JSON.stringify(recordset[0].Requisitos_legales).replace('"', '').replace('"', '')
                                                            resultado[6] = JSON.stringify(recordset[0].Requisitos_reglamentarios).replace('"', '').replace('"', '')
                                                            resultado[7] = JSON.stringify(recordset[0].IA_Muestra_fisica).replace('"', '').replace('"', '')
                                                            resultado[8] = JSON.stringify(recordset[0].EP_Muestra_fisica).replace('"', '').replace('"', '')
                                                            resultado[9] = JSON.stringify(recordset[0].Fecha_Muestra_fisica).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[10] = JSON.stringify(recordset[0].IA_Fotografia).replace('"', '').replace('"', '')
                                                            resultado[11] = JSON.stringify(recordset[0].EP_Fotografia).replace('"', '').replace('"', '')
                                                            resultado[12] = JSON.stringify(recordset[0].Fecha_Fotografia).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[13] = JSON.stringify(recordset[0].IA_Planos_adjuntos).replace('"', '').replace('"', '')
                                                            resultado[14] = JSON.stringify(recordset[0].EP_Planos_adjuntos).replace('"', '').replace('"', '')
                                                            resultado[15] = JSON.stringify(recordset[0].Fecha_Planos_adjuntos).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[16] = JSON.stringify(recordset[0].IA_Levantamientos_medidas).replace('"', '').replace('"', '')
                                                            resultado[17] = JSON.stringify(recordset[0].EP_Levantamientos_medidas).replace('"', '').replace('"', '')
                                                            resultado[18] = JSON.stringify(recordset[0].Fecha_Levantamientos_medidas).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[19] = JSON.stringify(recordset[0].Descripcion_Tecnica).replace('"', '').replace('"', '')
                                                            resultado[20] = JSON.stringify(recordset[0].Potenciales_fallas).replace('"', '').replace('"', '')

                                                            resultado[206] = JSON.stringify(recordset[0].IA_Mail_respaldo).replace('"', '').replace('"', '')
                                                            resultado[207] = JSON.stringify(recordset[0].EP_Mail_respaldo).replace('"', '').replace('"', '')
                                                            resultado[208] = JSON.stringify(recordset[0].Fecha_Mail_respaldo).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')

                                                            resultado[21] = JSON.stringify(query2[0].Fecha_inicio).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[22] = JSON.stringify(query2[0].Fecha_termino).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[23] = JSON.stringify(query2[0].NC_conceptual).replace('"', '').replace('"', '')
                                                            resultado[24] = JSON.stringify(query2[0].NC_basica).replace('"', '').replace('"', '')
                                                            resultado[25] = JSON.stringify(query2[0].NC_detalles).replace('"', '').replace('"', '')
                                                            resultado[26] = JSON.stringify(query2[0].NC_3D).replace('"', '').replace('"', '')
                                                            resultado[27] = JSON.stringify(query2[0].RES_ing).replace('"', '').replace('"', '')
                                                            resultado[28] = JSON.stringify(query2[0].RES_proyectista).replace('"', '').replace('"', '')
                                                            resultado[29] = JSON.stringify(query2[0].RES_dibujante).replace('"', '').replace('"', '')
                                                            resultado[30] = JSON.stringify(query2[0].Rint_Rext).replace('"', '').replace('"', '')
                                                            resultado[31] = JSON.stringify(query2[0].Inf_adicional).replace('"', '').replace('"', '')
                                                            resultado[32] = JSON.stringify(query2[0].REQ_bosquejo).replace('"', '').replace('"', '')
                                                            resultado[33] = JSON.stringify(query2[0].REQ_levantamiento).replace('"', '').replace('"', '')
                                                            resultado[34] = JSON.stringify(query2[0].REQ_planos).replace('"', '').replace('"', '')
                                                            resultado[35] = JSON.stringify(query2[0].REQ_descripcion).replace('"', '').replace('"', '')
                                                            resultado[36] = JSON.stringify(query2[0].REQ_ensayos).replace('"', '').replace('"', '')

                                                            resultado[37] = JSON.stringify(query3[0].Fecha_inicio).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[38] = JSON.stringify(query3[0].Fecha_termino).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[39] = JSON.stringify(query3[0].NC_desarrollo).replace('"', '').replace('"', '')
                                                            resultado[40] = JSON.stringify(query3[0].NC_compuesto).replace('"', '').replace('"', '')
                                                            resultado[41] = JSON.stringify(query3[0].NC_utilizacion).replace('"', '').replace('"', '')
                                                            resultado[42] = JSON.stringify(query3[0].NC_factible).replace('"', '').replace('"', '')
                                                            resultado[43] = JSON.stringify(query3[0].RES_pu).replace('"', '').replace('"', '')
                                                            resultado[44] = JSON.stringify(query3[0].RES_gomas).replace('"', '').replace('"', '')
                                                            resultado[45] = JSON.stringify(query3[0].RES_produccion).replace('"', '').replace('"', '')
                                                            resultado[46] = JSON.stringify(query3[0].Rint_Rext).replace('"', '').replace('"', '')
                                                            resultado[47] = JSON.stringify(query3[0].Inf_adicional).replace('"', '').replace('"', '')
                                                            resultado[48] = JSON.stringify(query3[0].REQ_terreno).replace('"', '').replace('"', '')
                                                            resultado[49] = JSON.stringify(query3[0].REQ_moldes).replace('"', '').replace('"', '')
                                                            resultado[50] = JSON.stringify(query3[0].REQ_tecnica).replace('"', '').replace('"', '')
                                                            resultado[51] = JSON.stringify(query3[0].REQ_laboratorio).replace('"', '').replace('"', '')
                                                            resultado[52] = JSON.stringify(query3[0].REQ_ensayos).replace('"', '').replace('"', '')


                                                            resultado[53] = JSON.stringify(query4[0].Fecha_inicio).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[54] = JSON.stringify(query4[0].Fecha_termino).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[55] = JSON.stringify(query4[0].C_estado1).replace('"', '').replace('"', '')
                                                            resultado[56] = JSON.stringify(query4[0].C_estado2).replace('"', '').replace('"', '')
                                                            resultado[57] = JSON.stringify(query4[0].C_estado3).replace('"', '').replace('"', '')
                                                            resultado[58] = JSON.stringify(query4[0].C_estado4).replace('"', '').replace('"', '')
                                                            resultado[209] = JSON.stringify(query4[0].C_estado5).replace('"', '').replace('"', '')
                                                            resultado[59] = JSON.stringify(query4[0].C_fecha1).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[60] = JSON.stringify(query4[0].C_fecha2).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[61] = JSON.stringify(query4[0].C_fecha3).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[62] = JSON.stringify(query4[0].C_fecha4).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[210] = JSON.stringify(query4[0].C_fecha5).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[63] = JSON.stringify(query4[0].C_controlado1).replace('"', '').replace('"', '')
                                                            resultado[64] = JSON.stringify(query4[0].C_controlado2).replace('"', '').replace('"', '')
                                                            resultado[65] = JSON.stringify(query4[0].C_controlado3).replace('"', '').replace('"', '')
                                                            resultado[66] = JSON.stringify(query4[0].C_controlado4).replace('"', '').replace('"', '')
                                                            resultado[211] = JSON.stringify(query4[0].C_controlado5).replace('"', '').replace('"', '')
                                                            resultado[67] = JSON.stringify(query4[0].C_ajuste1).replace('"', '').replace('"', '')
                                                            resultado[68] = JSON.stringify(query4[0].C_ajuste2).replace('"', '').replace('"', '')
                                                            resultado[69] = JSON.stringify(query4[0].C_ajuste3).replace('"', '').replace('"', '')
                                                            resultado[70] = JSON.stringify(query4[0].C_ajuste4).replace('"', '').replace('"', '')
                                                            resultado[212] = JSON.stringify(query4[0].C_ajuste5).replace('"', '').replace('"', '')
                                                            resultado[71] = JSON.stringify(query4[0].VB_desarollado_nombre).replace('"', '').replace('"', '')
                                                            resultado[72] = JSON.stringify(query4[0].VB_desarollado_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[73] = JSON.stringify(query4[0].VB_desarollado_cargo).replace('"', '').replace('"', '')
                                                            resultado[74] = JSON.stringify(query4[0].VB_verificado_nombre).replace('"', '').replace('"', '')
                                                            resultado[75] = JSON.stringify(query4[0].VB_verificado_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[76] = JSON.stringify(query4[0].VB_verificado_cargo).replace('"', '').replace('"', '')
                                                            resultado[77] = JSON.stringify(query4[0].VB_validado_nombre).replace('"', '').replace('"', '')
                                                            resultado[78] = JSON.stringify(query4[0].VB_validado_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[79] = JSON.stringify(query4[0].VB_validado_cargo).replace('"', '').replace('"', '')

                                                            resultado[81] = JSON.stringify(query5[0].Fecha_inicio).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[82] = JSON.stringify(query5[0].Fecha_termino).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[83] = JSON.stringify(query5[0].C_estado1).replace('"', '').replace('"', '')
                                                            resultado[84] = JSON.stringify(query5[0].C_estado2).replace('"', '').replace('"', '')
                                                            resultado[85] = JSON.stringify(query5[0].C_estado3).replace('"', '').replace('"', '')
                                                            resultado[86] = JSON.stringify(query5[0].C_estado4).replace('"', '').replace('"', '')
                                                            resultado[213] = JSON.stringify(query5[0].C_estado5).replace('"', '').replace('"', '')
                                                            resultado[87] = JSON.stringify(query5[0].C_fecha1).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[88] = JSON.stringify(query5[0].C_fecha2).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[89] = JSON.stringify(query5[0].C_fecha3).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[90] = JSON.stringify(query5[0].C_fecha4).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[214] = JSON.stringify(query5[0].C_fecha5).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[91] = JSON.stringify(query5[0].C_controlado1).replace('"', '').replace('"', '')
                                                            resultado[92] = JSON.stringify(query5[0].C_controlado2).replace('"', '').replace('"', '')
                                                            resultado[93] = JSON.stringify(query5[0].C_controlado3).replace('"', '').replace('"', '')
                                                            resultado[94] = JSON.stringify(query5[0].C_controlado4).replace('"', '').replace('"', '')
                                                            resultado[215] = JSON.stringify(query5[0].C_controlado5).replace('"', '').replace('"', '')
                                                            resultado[95] = JSON.stringify(query5[0].C_ajuste1).replace('"', '').replace('"', '')
                                                            resultado[96] = JSON.stringify(query5[0].C_ajuste2).replace('"', '').replace('"', '')
                                                            resultado[97] = JSON.stringify(query5[0].C_ajuste3).replace('"', '').replace('"', '')
                                                            resultado[98] = JSON.stringify(query5[0].C_ajuste4).replace('"', '').replace('"', '')
                                                            resultado[216] = JSON.stringify(query5[0].C_ajuste5).replace('"', '').replace('"', '')
                                                            resultado[99] = JSON.stringify(query5[0].VB_desarollado_nombre).replace('"', '').replace('"', '')
                                                            resultado[100] = JSON.stringify(query5[0].VB_desarollado_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[101] = JSON.stringify(query5[0].VB_desarollado_cargo).replace('"', '').replace('"', '')
                                                            resultado[102] = JSON.stringify(query5[0].VB_verificado_nombre).replace('"', '').replace('"', '')
                                                            resultado[103] = JSON.stringify(query5[0].VB_verificado_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[104] = JSON.stringify(query5[0].VB_verificado_cargo).replace('"', '').replace('"', '')
                                                            resultado[105] = JSON.stringify(query5[0].VB_validado_nombre).replace('"', '').replace('"', '')
                                                            resultado[106] = JSON.stringify(query5[0].VB_validado_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[107] = JSON.stringify(query5[0].VB_validado_cargo).replace('"', '').replace('"', '')
                                                            resultado[108] = JSON.stringify(query5[0].Codificacion_asignada).replace('"', '').replace('"', '')

                                                            resultado[109] = JSON.stringify(query6[0].Entrega_nombre).replace('"', '').replace('"', '')
                                                            resultado[110] = JSON.stringify(query6[0].Entrega_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[111] = JSON.stringify(query6[0].Entrega_cargo).replace('"', '').replace('"', '')
                                                            resultado[112] = JSON.stringify(query6[0].Realizacion_nombre).replace('"', '').replace('"', '')
                                                            resultado[113] = JSON.stringify(query6[0].Realizacion_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[114] = JSON.stringify(query6[0].Realizacion_cargo).replace('"', '').replace('"', '')
                                                            resultado[115] = JSON.stringify(query6[0].Validacion_nombre).replace('"', '').replace('"', '')
                                                            resultado[116] = JSON.stringify(query6[0].Validacion_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[117] = JSON.stringify(query6[0].Validacion_cargo).replace('"', '').replace('"', '')
                                                            resultado[118] = JSON.stringify(query6[0].Aprobacion_nombre).replace('"', '').replace('"', '')
                                                            resultado[119] = JSON.stringify(query6[0].Aprobacion_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[120] = JSON.stringify(query6[0].Aprobacion_cargo).replace('"', '').replace('"', '')

                                                            resultado[121] = JSON.stringify(query7[0].Prep_Pu_fechai).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[122] = JSON.stringify(query7[0].Prep_Pu_fechat).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[123] = JSON.stringify(query7[0].Prep_Pu_responsable).replace('"', '').replace('"', '')
                                                            resultado[124] = JSON.stringify(query7[0].Prep_Pu_validado).replace('"', '').replace('"', '')
                                                            resultado[125] = JSON.stringify(query7[0].Prep_Goma_fechai).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[126] = JSON.stringify(query7[0].Prep_Goma_fechat).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[127] = JSON.stringify(query7[0].Prep_Goma_responsable).replace('"', '').replace('"', '')
                                                            resultado[128] = JSON.stringify(query7[0].Prep_Goma_validado).replace('"', '').replace('"', '')
                                                            resultado[129] = JSON.stringify(query7[0].Fab_fechai).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[130] = JSON.stringify(query7[0].Fab_fechat).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[131] = JSON.stringify(query7[0].Fab_responsable).replace('"', '').replace('"', '')
                                                            resultado[132] = JSON.stringify(query7[0].Fab_validado).replace('"', '').replace('"', '')
                                                            resultado[133] = JSON.stringify(query7[0].Gra_fechai).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[134] = JSON.stringify(query7[0].Gra_fechat).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[135] = JSON.stringify(query7[0].Gra_responsable).replace('"', '').replace('"', '')
                                                            resultado[136] = JSON.stringify(query7[0].Gra_validado).replace('"', '').replace('"', '')
                                                            resultado[137] = JSON.stringify(query7[0].PyA_fechai).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[138] = JSON.stringify(query7[0].PyA_fechat).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[139] = JSON.stringify(query7[0].PyA_responsable).replace('"', '').replace('"', '')
                                                            resultado[140] = JSON.stringify(query7[0].PyA_validado).replace('"', '').replace('"', '')
                                                            resultado[141] = JSON.stringify(query7[0].Pro_Pu_fechai).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[142] = JSON.stringify(query7[0].Pro_Pu_fechat).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[143] = JSON.stringify(query7[0].Pro_Pu_responsable).replace('"', '').replace('"', '')
                                                            resultado[144] = JSON.stringify(query7[0].Pro_Pu_validado).replace('"', '').replace('"', '')
                                                            resultado[145] = JSON.stringify(query7[0].PyA_validado).replace('"', '').replace('"', '')
                                                            resultado[146] = JSON.stringify(query7[0].Pro_Goma_fechai).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[147] = JSON.stringify(query7[0].Pro_Goma_fechat).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[148] = JSON.stringify(query7[0].Pro_Goma_responsable).replace('"', '').replace('"', '')
                                                            resultado[149] = JSON.stringify(query7[0].Pro_Goma_validado).replace('"', '').replace('"', '')


                                                            resultado[150] = JSON.stringify(query8[0].Curvas_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[151] = JSON.stringify(query8[0].Curvas_responsable).replace('"', '').replace('"', '')
                                                            resultado[152] = JSON.stringify(query8[0].Curvas_validado).replace('"', '').replace('"', '')
                                                            resultado[153] = JSON.stringify(query8[0].Lab_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[154] = JSON.stringify(query8[0].Lab_responsable).replace('"', '').replace('"', '')
                                                            resultado[155] = JSON.stringify(query8[0].Lab_validado).replace('"', '').replace('"', '')
                                                            resultado[156] = JSON.stringify(query8[0].Control_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[157] = JSON.stringify(query8[0].Control_responsable).replace('"', '').replace('"', '')
                                                            resultado[158] = JSON.stringify(query8[0].Control_validado).replace('"', '').replace('"', '')
                                                            resultado[159] = JSON.stringify(query8[0].Ext_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', ''),
                                                                resultado[160] = JSON.stringify(query8[0].Ext_responsable).replace('"', '').replace('"', '')
                                                            resultado[161] = JSON.stringify(query8[0].Ext_validado).replace('"', '').replace('"', '')
                                                            resultado[162] = JSON.stringify(query8[0].Lib_cli_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[163] = JSON.stringify(query8[0].Lib_cli_responsable).replace('"', '').replace('"', '')
                                                            resultado[164] = JSON.stringify(query8[0].Lib_cli_validado).replace('"', '').replace('"', '')
                                                            resultado[165] = JSON.stringify(query8[0].Lib_ter_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[166] = JSON.stringify(query8[0].Lib_ter_responsable).replace('"', '').replace('"', '')
                                                            resultado[167] = JSON.stringify(query8[0].Lib_ter_validado).replace('"', '').replace('"', '')


                                                            resultado[168] = JSON.stringify(query9[0].Trazado_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', ''),
                                                                resultado[169] = JSON.stringify(query9[0].Trazado_responsable).replace('"', '').replace('"', '')
                                                            resultado[170] = JSON.stringify(query9[0].Trazado_validado).replace('"', '').replace('"', '')
                                                            resultado[171] = JSON.stringify(query9[0].Transporte_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[172] = JSON.stringify(query9[0].Transporte_responsable).replace('"', '').replace('"', '')
                                                            resultado[173] = JSON.stringify(query9[0].Transporte_validado).replace('"', '').replace('"', '')
                                                            resultado[174] = JSON.stringify(query9[0].Recepcion_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[175] = JSON.stringify(query9[0].Recepcion_responsable).replace('"', '').replace('"', '')
                                                            resultado[176] = JSON.stringify(query9[0].Recepcion_validado).replace('"', '').replace('"', '')

                                                            resultado[177] = JSON.stringify(query10[0].Ccontroles).replace('"', '').replace('"', '')
                                                            resultado[178] = JSON.stringify(query10[0].Cverificaciones).replace('"', '').replace('"', '')
                                                            resultado[179] = JSON.stringify(query10[0].Cvalidaciones).replace('"', '').replace('"', '')
                                                            resultado[180] = JSON.stringify(query10[0].Cresponsable).replace('"', '').replace('"', '')
                                                            resultado[181] = JSON.stringify(query10[0].Cfuncionales).replace('"', '').replace('"', '')
                                                            resultado[182] = JSON.stringify(query10[0].Cdesempeno).replace('"', '').replace('"', '')
                                                            resultado[183] = JSON.stringify(query10[0].Cnormativos).replace('"', '').replace('"', '')
                                                            resultado[184] = JSON.stringify(query10[0].Clegales).replace('"', '').replace('"', '')
                                                            resultado[185] = JSON.stringify(query10[0].Creglamentarios).replace('"', '').replace('"', '')
                                                            resultado[186] = JSON.stringify(query10[0].No_accion).replace('"', '').replace('"', '')
                                                            resultado[187] = JSON.stringify(query10[0].No_folio).replace('"', '').replace('"', '')

                                                            resultado[188] = JSON.stringify(query11[0].Nombre).replace('"', '').replace('"', '')
                                                            resultado[189] = JSON.stringify(query11[0].Area).replace('"', '').replace('"', '')
                                                            resultado[190] = JSON.stringify(query11[0].Mail).replace('"', '').replace('"', '')
                                                            resultado[191] = JSON.stringify(query11[0].Factura).replace('"', '').replace('"', '')
                                                            resultado[192] = JSON.stringify(query11[0].FechaE).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[193] = JSON.stringify(query11[0].FechaP).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')

                                                            resultado[194] = JSON.stringify(query12[0].Fecha_solicitud).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[195] = JSON.stringify(query12[0].Fecha_cierre).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[196] = JSON.stringify(query12[0].Cambio_solicitado).replace('"', '').replace('"', '')
                                                            resultado[197] = JSON.stringify(query12[0].Verificado_por).replace('"', '').replace('"', '')
                                                            resultado[198] = JSON.stringify(query12[0].Validado_por).replace('"', '').replace('"', '')
                                                            resultado[199] = JSON.stringify(query12[0].Desarrollado_por).replace('"', '').replace('"', '')
                                                            resultado[200] = JSON.stringify(query12[0].Nuevo_codigo).replace('"', '').replace('"', '')
                                                            resultado[217] = JSON.stringify(query12[0].N_revision).replace('"', '').replace('"', '')

                                                            resultado[201] = JSON.stringify(query13[0].Proyecto).replace('"', '').replace('"', '')
                                                            resultado[202] = JSON.stringify(query13[0].Cliente).replace('"', '').replace('"', '')
                                                            resultado[203] = (JSON.stringify(query13[0].Fecha_ingreso).replace('"', '').replace('"', '').replace('T00:00:00.000Z', ''))

                                                            resultado[204] = JSON.stringify(query13[0].Codigo).replace('"', '').replace('"', '')
                                                            resultado[205] = JSON.stringify(query13[0].Estado).replace('"', '').replace('"', '')

                                                            for (var flag = 1; flag <= 217; flag++) {
                                                                if (resultado[flag] == 'null') {
                                                                    resultado[flag] = "NAP";
                                                                }
                                                                if (resultado[flag] == undefined) {
                                                                    resultado[flag] = "NAP";
                                                                }


                                                                resultado[flag] = resultado[flag].toUpperCase();
                                                                // console.log (resultado[flag])
                                                            }
                                                            console.log (resultado[7])
                                                            res.render('editar_registros', {
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

                                                                resultado206: resultado[206],
                                                                resultado207: resultado[207],
                                                                resultado208: resultado[208],

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
                                                                resultado41: resultado[41],
                                                                resultado42: resultado[42],
                                                                resultado43: resultado[43],
                                                                resultado44: resultado[44],
                                                                resultado45: resultado[45],
                                                                resultado46: resultado[46],
                                                                resultado47: resultado[47],
                                                                resultado48: resultado[48],
                                                                resultado49: resultado[49],
                                                                resultado50: resultado[50],
                                                                resultado51: resultado[51],
                                                                resultado52: resultado[52],


                                                                resultado53: resultado[53],
                                                                resultado54: resultado[54],
                                                                resultado55: resultado[55],
                                                                resultado56: resultado[56],
                                                                resultado57: resultado[57],
                                                                resultado58: resultado[58],
                                                                resultado209: resultado[209],
                                                                resultado59: resultado[59],
                                                                resultado60: resultado[60],
                                                                resultado61: resultado[61],
                                                                resultado62: resultado[62],
                                                                resultado210: resultado[210],
                                                                resultado63: resultado[63],
                                                                resultado64: resultado[64],
                                                                resultado65: resultado[65],
                                                                resultado66: resultado[66],
                                                                resultado211: resultado[211],
                                                                resultado67: resultado[67],
                                                                resultado68: resultado[68],
                                                                resultado69: resultado[69],
                                                                resultado70: resultado[70],
                                                                resultado212: resultado[212],
                                                                resultado71: resultado[71],
                                                                resultado72: resultado[72],
                                                                resultado73: resultado[73],
                                                                resultado74: resultado[74],
                                                                resultado75: resultado[75],
                                                                resultado76: resultado[76],
                                                                resultado77: resultado[77],
                                                                resultado78: resultado[78],
                                                                resultado79: resultado[79],

                                                                resultado81: resultado[81],
                                                                resultado82: resultado[82],
                                                                resultado83: resultado[83],
                                                                resultado84: resultado[84],
                                                                resultado85: resultado[85],
                                                                resultado86: resultado[86],
                                                                resultado213: resultado[213],
                                                                resultado87: resultado[87],
                                                                resultado88: resultado[88],
                                                                resultado89: resultado[89],
                                                                resultado90: resultado[90],
                                                                resultado214: resultado[214],
                                                                resultado91: resultado[91],
                                                                resultado92: resultado[92],
                                                                resultado93: resultado[93],
                                                                resultado94: resultado[94],
                                                                resultado215: resultado[215],
                                                                resultado95: resultado[95],
                                                                resultado96: resultado[96],
                                                                resultado97: resultado[97],
                                                                resultado98: resultado[98],
                                                                resultado216: resultado[216],
                                                                resultado99: resultado[99],
                                                                resultado100: resultado[100],
                                                                resultado101: resultado[101],
                                                                resultado102: resultado[102],
                                                                resultado103: resultado[103],
                                                                resultado104: resultado[104],
                                                                resultado105: resultado[105],
                                                                resultado106: resultado[106],
                                                                resultado107: resultado[107],
                                                                resultado108: resultado[108],

                                                                resultado109: resultado[109],
                                                                resultado110: resultado[110],
                                                                resultado111: resultado[111],
                                                                resultado112: resultado[112],
                                                                resultado113: resultado[113],
                                                                resultado114: resultado[114],
                                                                resultado115: resultado[115],
                                                                resultado116: resultado[116],
                                                                resultado117: resultado[117],
                                                                resultado118: resultado[118],
                                                                resultado119: resultado[119],
                                                                resultado120: resultado[120],

                                                                resultado121: resultado[121],
                                                                resultado122: resultado[122],
                                                                resultado123: resultado[123],
                                                                resultado124: resultado[124],
                                                                resultado125: resultado[125],
                                                                resultado126: resultado[126],
                                                                resultado127: resultado[127],
                                                                resultado128: resultado[128],
                                                                resultado129: resultado[129],
                                                                resultado130: resultado[130],
                                                                resultado131: resultado[131],
                                                                resultado132: resultado[132],
                                                                resultado133: resultado[133],
                                                                resultado134: resultado[134],
                                                                resultado135: resultado[135],
                                                                resultado136: resultado[136],
                                                                resultado137: resultado[137],
                                                                resultado138: resultado[138],
                                                                resultado139: resultado[139],
                                                                resultado140: resultado[140],
                                                                resultado141: resultado[141],
                                                                resultado142: resultado[142],
                                                                resultado143: resultado[143],
                                                                resultado144: resultado[144],
                                                                resultado145: resultado[145],
                                                                resultado146: resultado[146],
                                                                resultado147: resultado[147],
                                                                resultado148: resultado[148],
                                                                resultado149: resultado[149],


                                                                resultado150: resultado[150],
                                                                resultado151: resultado[151],
                                                                resultado152: resultado[152],
                                                                resultado153: resultado[153],
                                                                resultado154: resultado[154],
                                                                resultado155: resultado[155],
                                                                resultado156: resultado[156],
                                                                resultado157: resultado[157],
                                                                resultado158: resultado[158],
                                                                resultado159: resultado[159],
                                                                resultado160: resultado[160],
                                                                resultado161: resultado[161],
                                                                resultado162: resultado[162],
                                                                resultado163: resultado[163],
                                                                resultado164: resultado[164],
                                                                resultado165: resultado[165],
                                                                resultado166: resultado[166],
                                                                resultado167: resultado[167],

                                                                resultado168: resultado[168],
                                                                resultado169: resultado[169],
                                                                resultado170: resultado[170],
                                                                resultado171: resultado[171],
                                                                resultado172: resultado[172],
                                                                resultado173: resultado[173],
                                                                resultado174: resultado[174],
                                                                resultado175: resultado[175],
                                                                resultado176: resultado[176],

                                                                resultado177: resultado[177],
                                                                resultado178: resultado[178],
                                                                resultado179: resultado[179],
                                                                resultado180: resultado[180],
                                                                resultado181: resultado[181],
                                                                resultado182: resultado[182],
                                                                resultado183: resultado[183],
                                                                resultado184: resultado[184],
                                                                resultado185: resultado[185],
                                                                resultado186: resultado[186],
                                                                resultado187: resultado[187],

                                                                resultado188: resultado[188],
                                                                resultado189: resultado[189],
                                                                resultado190: resultado[190],
                                                                resultado191: resultado[191],
                                                                resultado192: resultado[192],
                                                                resultado193: resultado[193],

                                                                resultado194: resultado[194],
                                                                resultado195: resultado[195],
                                                                resultado196: resultado[196],
                                                                resultado197: resultado[197],
                                                                resultado198: resultado[198],
                                                                resultado199: resultado[199],
                                                                resultado200: resultado[200],
                                                                resultado217: resultado[217],

                                                                resultado201: resultado[201],
                                                                resultado202: resultado[202],
                                                                resultado203: resultado[203],
                                                                resultado204: resultado[204],
                                                                resultado205: resultado[205]
                                                                
                                                            });
                                                            conn.close();
                                                        }).catch(function (err) { console.log(err); conn.close(); })
                                                    }).catch(function (err) { console.log(err); conn.close(); })
                                                }).catch(function (err) { console.log(err); conn.close(); })
                                            }).catch(function (err) { console.log(err); conn.close(); })
                                        }).catch(function (err) { console.log(err); conn.close(); })
                                    }).catch(function (err) { console.log(err); conn.close(); })
                                }).catch(function (err) { console.log(err); conn.close(); })
                            }).catch(function (err) { console.log(err); conn.close(); })
                        }).catch(function (err) { console.log(err); conn.close(); })
                    }).catch(function (err) { console.log(err); conn.close(); })
                }).catch(function (err) { console.log(err); conn.close(); })
            }).catch(function (err) { console.log(err); conn.close(); })

        }).catch(function (err) { console.log(err); conn.close(); })
    }).catch(function (err) {console.log(err);});
});

//router.post('/mail/0', checkAuth, function (req, res) {
//    var proyecto = req.body.proyecto;
//    var cliente = req.body.cliente;
//    var cod_proyecto = req.body.cod_proyecto;
//    var fechai = req.body.fechai;

//    var querysalida = "Update Indice set Proyecto = '" + proyecto + "', Cliente ='" + cliente + "', Fecha_ingreso= '" + fechai + "', Codigo = '" + cod_proyecto + "'  WHERE Id= " + ID + "; ";
//    console.log('----------inicio--------');
//    console.log(querysalida);
//    console.log('----------final--------');

//    var conn = new sql.Connection(dbConfig);
//    conn.connect().then(function () {
//        var req = new sql.Request(conn);
//        req.query(querysalida).then(function (recordset) {
//            conn.close();
//        }).catch(function (err) { console.log(err); conn.close(); });
//    }).catch(function (err) { console.log(err); });



//    transporter.sendMail({
//        from: 'notificacion@busanc.cl',
//        to: 'deeb23@gmail.com',
//        subject: 'Busanc: Proyecto' + proyecto,
//        text: 'El proyecto con codigo' + cod_proyecto + ' a dado inicio',
//    }, function (error, response) {
//        if (error) {
//            console.log(error);
//        } else {
//            console.log('Message sent');
//        }
//    });

//});

router.post('/alter/0', checkAuth, function (req, res) {
    var proyecto = req.body.proyecto;
    var cliente = req.body.cliente;
    var cod_proyecto = req.body.cod_proyecto;
    var fechai = req.body.fechai;
    var Correo = req.body.Correo;
    var Estados = req.body.cambio_estados;

    var querysalida = "Update Indice2 set Estado=" + Estados +", Proyecto = '" + proyecto + "', Fecha_ingreso= '" + fechai +"', Codigo = '" + cod_proyecto +"'  WHERE Id= " + ID + "; ";
    console.log('----------inicio--------');
    console.log(querysalida);
    console.log('----------final--------');
    console.log("Correo: ");
    console.log(Correo);
    
    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(querysalida).then(function (recordset) {
            req.query("select * from Correos where id = 1;").then(function (recordset) {
                fase2 = JSON.stringify(recordset[0].Fase2).replace('"', '').replace('"', '');
                if (Correo == 1) {
                    transporter.sendMail({
                        from: 'notificacion@busanc.cl',
                        to: fase2,
                        subject: 'Se ha iniciado el registro de validación de diseño y desarrollo para el  nuevo proyecto : ' + resultado[204],
                        text: 'Numero de Solcitud: ' + resultado[1] + '\nNombre del Cliente: ' + resultado[202] + '\nNombre del Proyecto: ' + resultado[201] + '\nFecha de Inicio: ' + resultado[203] + '\nCodigo Proyecto: ' + resultado[204],
                    }, function (error, response) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Message sent');
                        }
                    });
                }
            })
            conn.close();
        }).catch(function (err) { console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err); });
    

   
    res.redirect('/modificacion.html');
});


router.post('/alter/1', checkAuth, function (req, res) {
    console.log ("alter 1");
    var req_funcionales = req.body.req_funcionales;
    var req_desempeno = req.body.req_desempeño;
    var req_normativo = req.body.req_normativo;
    var req_legales = req.body.req_legales;
    var req_reglamentarios = req.body.req_reglamentarios;   
    var muestra_fis = req.body.muestra_fis;
    var env_fis = req.body.env_fis;
    var fecha_fis = req.body.fecha_fis;
    var fotografias = req.body.fotografias;
    var tomadas_fot = req.body.tomadas_fot;    
    var fecha_fot = req.body.fecha_fot;
    var planos_adj = req.body.planos_adj;
    var env_adj = req.body.env_adj;
    var fecha_adj = req.body.fecha_adj;
    var levantamiento = req.body.levantamiento;    
    var env_lev = req.body.env_lev;
    var fecha_lev = req.body.fecha_lev;
    var descripcion = req.body.descripcion;
    var fallas_pot = req.body.fallas_pot;
    var mail_res = req.body.mail_res;
    var env_mail = req.body.env_mail;
    var fecha_mail = req.body.fecha_mail;

    var querysalida = "Update Entradas_proyecto2 set Requisitos_funcionales = '" + req_funcionales + "', Requisitos_desempeño = '" + req_desempeno + "', Requisitos_normativo = '" + req_normativo + "' , Requisitos_legales = '" + req_legales + "', Requisitos_reglamentarios = '" + req_reglamentarios + "', IA_Muestra_fisica = " + muestra_fis + ", EP_Muestra_fisica = '" + env_fis + "', Fecha_Muestra_fisica = '" + fecha_fis + "', IA_Fotografia = " + fotografias + ", EP_Fotografia = '" + tomadas_fot + "', Fecha_Fotografia = '" + fecha_fot + "', IA_Planos_adjuntos = " + planos_adj + " , EP_Planos_adjuntos = '" + env_adj + "', Fecha_Planos_adjuntos = '" + fecha_adj + "' , IA_Levantamientos_medidas = " + levantamiento + " , EP_Levantamientos_medidas = '" + env_lev + "', Fecha_Levantamientos_medidas = '" + fecha_lev + "', IA_Mail_respaldo = " + mail_res + ", EP_Mail_respaldo = '" + env_mail + "', Fecha_Mail_respaldo = '" + fecha_mail + "' , Descripcion_Tecnica = '" + descripcion + "' , Potenciales_fallas = '" + fallas_pot + "' WHERE Id= " + ID + "; ";
    console.log('----------inicio--------');
    console.log(querysalida);
    console.log('----------final--------');

    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(querysalida).then(function (recordset) {
            conn.close();
        }).catch(function (err) { console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err); });

    res.redirect('/modificacion.html');
    
});

router.post('/alter/21', checkAuth, function (req, res) {
    
    console.log("alter 21");
    var fechai = req.body.fechai;    
    var fechat = req.body.fechat;
    var ing_conceptual = req.body.ing_conceptual;
    var ing_basaica = req.body.ing_basaica;
    var ing_detalles = req.body.ing_detalles;
    var c3d = req.body.c3d;    
    var sup_ing = req.body.sup_ing;
    var proyectista = req.body.proyectista;
    var dibujante = req.body.dibujante;
    var recursos_int = req.body.recursos_int;
    var inf_documentada = req.body.inf_documentada;
    var req_bosq = req.body.req_bosq;
    var req_lev = req.body.req_lev;
    var req_ens = req.body.req_ensayos;
    var req_planos = req.body.req_planos;
    var req_descripcion = req.body.req_descripcion;
    var descripcion = req.body.descripcion;

    var querysalida = "Update Planificacion_planos2 set Fecha_inicio = '" + fechai + "',Fecha_termino = '" + fechat + "',NC_conceptual = "+ ing_conceptual +",NC_basica = " + ing_basaica + ",NC_detalles = " + ing_detalles + "  ,NC_3D = " + c3d + " ,RES_ing = '" + sup_ing + "' ,RES_proyectista = '" + proyectista + "' ,RES_dibujante = '" + dibujante + "' ,Rint_Rext = '" + recursos_int + "'  ,Inf_adicional = '" + inf_documentada + "' ,REQ_bosquejo =" + req_bosq + ",REQ_levantamiento = " + req_lev + " ,REQ_planos = " + req_planos + ",REQ_descripcion = " + req_descripcion + " ,REQ_ensayos = " + req_ens + " WHERE Id= " + ID + "; ";
    console.log('----------inicio--------');
    console.log(querysalida);
    console.log('----------final--------');

    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(querysalida).then(function (recordset) {
            conn.close();
        }).catch(function (err) { console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err); });

    res.redirect('/modificacion.html');

});

router.post('/alter/22', checkAuth, function (req, res) {
    
    console.log("alter 22");
    var fechai = req.body.fechai;    
    var fechat = req.body.fechat;
    var nc_desarrollo = req.body.nc_desarrollo;
    var nc_mejora = req.body.nc_mejora;
    var nc_utilizacion = req.body.nc_utilizacion;
    var nc_factible = req.body.nc_factible;    
    var res_pu = req.body.res_pu;
    var res_gomas = req.body.res_gomas;
    var res_produccion = req.body.res_produccion;
    var recursos_int = req.body.recursos_int;
    var inf_documentada = req.body.inf_documentada;
    var req_terr = req.body.req_terr;
    var req_mol = req.body.req_mol;
    var req_tec = req.body.req_tec;
    var req_lab = req.body.req_lab;
    var req_ens = req.body.req_ens;

    var querysalida = "Update Planificacion_compuestos2 set Fecha_inicio= '" + fechai + "',Fecha_termino= '" + fechat + " '  ,NC_desarrollo = " + nc_desarrollo + "  ,NC_compuesto = " + nc_mejora + " ,NC_utilizacion = " + nc_utilizacion + " ,NC_factible = " + nc_factible + " ,RES_pu = '" + res_pu + "',RES_gomas = '" + res_gomas + "' ,RES_produccion = '" + res_produccion + "' ,Rint_Rext = '" + recursos_int + "',Inf_adicional = '" + inf_documentada + "'  ,REQ_terreno = " + req_terr + " ,REQ_moldes = " + req_mol + ",REQ_tecnica = " + req_tec + " ,REQ_laboratorio = " + req_lab + " ,REQ_ensayos = " + req_ens + " WHERE Id= " + ID + "; ";
    console.log('----------inicio--------');
    console.log(querysalida);
    console.log('----------final--------');

    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(querysalida).then(function (recordset) {
            conn.close();
        }).catch(function (err) { console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err); });

    res.redirect('/modificacion.html');
});

router.post('/alter/31', checkAuth, function (req, res) {
    console.log("alter 31");
    var fechai = req.body.fechai;    
    var fechat = req.body.fechat;
    var estado1 = req.body.estado1;
    var estado2 = req.body.estado2;
    var estado3 = req.body.estado3;
    var estado4 = req.body.estado4;
    var estado5 = req.body.estado5;        
    var fecha1 = req.body.fecha1;
    var fecha2 = req.body.fecha2;
    var fecha3 = req.body.fecha3;
    var fecha4 = req.body.fecha4;
    var fecha5 = req.body.fecha5;
    var controlado1 = req.body.controlado1;
    var controlado2 = req.body.controlado2;
    var controlado3 = req.body.controlado3;
    var controlado4 = req.body.controlado4;
    var controlado5 = req.body.controlado5;
    var ajuste1 = req.body.ajuste1;
    var ajuste2 = req.body.ajuste2;
    var ajuste3 = req.body.ajuste3;
    var ajuste4 = req.body.ajuste4;
    var ajuste5 = req.body.ajuste5;
    var desarllado_nombre = req.body.desarllado_nombre;
    var desarrollado_fecha = req.body.desarrollado_fecha;
    var desarrollado_cargo = req.body.desarrollado_cargo;
    var verificado_nombre = req.body.verificado_nombre;
    var verificado_fecha = req.body.verificado_fecha;
    var verificado_cargo = req.body.verificado_cargo;
    var validado_nombre = req.body.validado_nombre;
    var validado_fecha = req.body.validado_fecha;
    var validado_cargo = req.body.validado_cargo;

    var querysalida = "Update Diseno_planos2 set Fecha_inicio = '" + fechai + "'  ,Fecha_termino = '" + fechat + "'   ,C_estado1 = " + estado1 + " ,C_estado2 = " + estado2 + " ,C_estado3 = " + estado3 + "  ,C_estado4 = " + estado4 + ", C_estado5 = " + estado5 + "   ,C_fecha1 = '" + fecha1 + "'  ,C_fecha2 = '" + fecha2 + "'   ,C_fecha3 = '" + fecha3 + "' ,C_fecha4 = '" + fecha4 + "' ,C_fecha5 = '" + fecha5 + "'  ,C_controlado1 = '" + controlado1 + "' ,C_controlado2 = '" + controlado2 + "' ,C_controlado3 = '" + controlado3 + "' ,C_controlado4 = '" + controlado4 + "',C_controlado5 = '" + controlado5 + "' ,C_ajuste1 = '" + ajuste1 + "' ,C_ajuste2 = '" + ajuste2 + "' ,C_ajuste3 = '" + ajuste3 + "' ,C_ajuste4 = '" + ajuste4 + "',C_ajuste5 = '" + ajuste5 + "' ,VB_desarollado_nombre = '" + desarllado_nombre + "' ,VB_desarollado_fecha = '" + desarrollado_fecha + "'  ,VB_desarollado_cargo = '" + desarrollado_cargo + "',VB_verificado_nombre = '" + verificado_nombre + "' ,VB_verificado_fecha = '" + verificado_fecha + "'  ,VB_verificado_cargo = '" + verificado_cargo + "',VB_validado_nombre = '" + validado_nombre + "' ,VB_validado_fecha = '" + validado_fecha + "'  ,VB_validado_cargo = '" + validado_cargo + "' WHERE Id= " + ID + "; ";
    console.log('----------inicio--------');
    console.log(querysalida);
    console.log('----------final--------');

    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(querysalida).then(function (recordset) {
            conn.close();
        }).catch(function (err) { console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err); });

    res.redirect('/modificacion.html');
});

router.post('/alter/32', checkAuth, function (req, res) {
    console.log("alter 32");
    var fechai = req.body.fechai;    
    var fechat = req.body.fechat;
    var codificacion = req.body.codificacion;
    var e1 = req.body.e1;
    var e2 = req.body.e2;
    var e3 = req.body.e3;    
    var e4 = req.body.e4;
    var e5 = req.body.e5;
    var f1 = req.body.f1;
    var f2 = req.body.f2;
    var f3 = req.body.f3;    
    var f4 = req.body.f4;
    var f5 = req.body.f5;
    var c1 = req.body.c1;
    var c2 = req.body.c2;
    var c3 = req.body.c3;    
    var c4 = req.body.c4;
    var c5 = req.body.c5;
    var a1 = req.body.a1;
    var a2 = req.body.a2;
    var a3 = req.body.a3;    
    var a4 = req.body.a4;
    var a5 = req.body.a5;
    var d_nombre = req.body.d_nombre;
    var d_fecha = req.body.d_fecha  ;
    var d_cargo = req.body.d_cargo;
    var v_nombre = req.body.v_nombre;
    var v_fecha = req.body.v_fecha;
    var v_cargo = req.body.v_cargo;
    var val_nombre = req.body.val_nombre;
    var val_fecha = req.body.val_fecha;
    var val_cargo = req.body.val_cargo;

    var querysalida = "Update Diseno_compuestos2 set Fecha_inicio = '" + fechai + "',Fecha_termino = '" + fechat + "'  ,Codificacion_asignada = '" + codificacion + "' ,C_estado1 = " + e1 + " ,C_estado2 = " + e2 + " ,C_estado3 = " + e3 + " ,C_estado4 = " + e4 + ",C_estado5 = " + e5 + " ,C_fecha1 = '" + f1 + "'  ,C_fecha2 = '" + f2 + "'   ,C_fecha3 = '" + f3 + "'  ,C_fecha4 = '" + f4 + "',C_fecha5 = '" + f5 + "'  ,C_controlado1 = '" + c1 + "' ,C_controlado2 = '" + c2 + "'  ,C_controlado3 = '" + c3 + "'  ,C_controlado4 = '" + c4 + "',C_controlado5 = '" + c5 + "', C_ajuste1 = '" + a1 + "' ,C_ajuste2 = '" + a2 + "' ,C_ajuste3 = '" + a3 + "'  ,C_ajuste4 = '" + a4 + "',C_ajuste5 = '" + a5 + "' ,VB_desarollado_nombre = '" + d_nombre + "'  ,VB_desarollado_fecha = '" + d_fecha + "'   ,VB_desarollado_cargo = '" + d_cargo + "' ,VB_verificado_nombre = '" + v_nombre + "' ,VB_verificado_fecha = '" + v_fecha + "'  ,VB_verificado_cargo = '" + v_cargo + "' ,VB_validado_nombre = '" + val_nombre + "' ,VB_validado_fecha = '" + val_fecha + "'  ,VB_validado_cargo = '" + val_cargo + "' WHERE Id= " + ID + "; ";


    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(querysalida).then(function (recordset) {
            conn.close();
        }).catch(function (err) { console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err); });

    res.redirect('/modificacion.html');
});

router.post('/alter/4', checkAuth, function (req, res) {
    console.log("alter 4");
    var e_nombre = req.body.e_nombre;
    var e_fecha = req.body.e_fecha;
    var e_cargo = req.body.e_cargo;    
    var r_nombre = req.body.r_nombre;
    var r_fecha = req.body.r_fecha;
    var r_cargo = req.body.r_cargo;
    var v_nombre = req.body.v_nombre;    
    var v_fecha = req.body.v_fecha;
    var v_cargo = req.body.v_cargo;
    var a_nombre = req.body.a_nombre;
    var a_fecha = req.body.a_fecha;    
    var a_cargo = req.body.a_cargo;

    var querysalida = "Update Cotizacion_proyecto2 set Entrega_nombre = '" + e_nombre + "' ,Entrega_fecha = '" + e_fecha + "' ,Entrega_cargo = '" + e_cargo + "',Realizacion_nombre = '" + r_nombre + "'  ,Realizacion_fecha = '" + r_fecha + "'  ,Realizacion_cargo = '" + r_cargo + "' ,Validacion_nombre = '" + v_nombre + "'  ,Validacion_fecha = '" + v_fecha + "' ,Validacion_cargo = '" + v_cargo + "',Aprobacion_nombre = '" + a_nombre + "' ,Aprobacion_fecha = '" + a_fecha + "'   ,Aprobacion_cargo = '" + a_cargo + "' WHERE Id= " + ID + "; ";
    console.log('----------inicio--------');
    console.log(querysalida);
    console.log('----------final--------');

    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(querysalida).then(function (recordset) {
            conn.close();
        }).catch(function (err) { console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err); });

    res.redirect('/modificacion.html');
});

router.post('/alter/5', checkAuth, function (req, res) {
    
    console.log("alter 5");
    var pu_fechai = req.body.pu_fechai;
    var pu_fechat = req.body.pu_fechat;
    var pu_responsable = req.body.pu_responsable;    
    var pu_validado = req.body.pu_validado;
    var pre_fechai = req.body.pre_fechai;
    var pre_fechat = req.body.pre_fechat;
    var pre_responsable = req.body.pre_responsable;    
    var pre_validado = req.body.pre_validado;
    var fab_fechai = req.body.fab_fechai;
    var fab_fechat = req.body.fab_fechat;
    var fab_responsable = req.body.fab_responsable;    
    var fab_validado = req.body.fab_validado;
    var gra_fechai = req.body.gra_fechai;
    var gra_fechat = req.body.gra_fechat;
    var gra_responsable = req.body.gra_responsable;    
    var gra_validado = req.body.gra_validado;
    var pin_fechai = req.body.pin_fechai;
    var pin_fechat = req.body.pin_fechat;
    var pin_responsale = req.body.pin_responsale;    
    var pin_validado = req.body.pin_validado;
    var pro_pu_fechai = req.body.pro_pu_fechai;
    var pro_pu_fechat = req.body.pro_pu_fechat;
    var pro_pu_responsable = req.body.pro_pu_responsable;    
    var pro_pu_validado = req.body.pro_pu_validado;

    var pro_gom_fechai = req.body.pro_gom_fechai;
    var pro_gom_fechat = req.body.pro_gom_fechat;
    var pro_gom_responsable = req.body.pro_gom_responsable;    
    var pro_gom_validado = req.body.pro_gom_validado;

    var querysalida = "Update Desarrollo_proyecto2 set Prep_Pu_fechai = '" + pu_fechai + "' ,Prep_Pu_fechat = '" + pu_fechat + "' ,Prep_Pu_responsable = '" + pu_responsable + "' ,Prep_Pu_validado = '" + pu_validado + "'  ,Prep_Goma_fechai = '" + pre_fechai + "'  ,Prep_Goma_fechat = '" + pre_fechat + "'  ,Prep_Goma_responsable = '" + pre_responsable + "' ,Prep_Goma_validado = '" + pre_validado + "'  ,Fab_fechai = '" + fab_fechai + "'   ,Fab_fechat = '" + fab_fechat + "'   ,Fab_responsable = '" + fab_responsable + "' ,Fab_validado = '" + fab_validado + "'  ,Gra_fechai = '" + gra_fechai + "'    ,Gra_fechat = '" + gra_fechat + "'  ,Gra_responsable = '" + gra_responsable + "'  ,Gra_validado = '" + gra_validado + "' ,PyA_fechai = '" + pin_fechai + "'   ,PyA_fechat = '" + pin_fechat + "'  ,PyA_responsable = '" + pin_responsale + "' ,PyA_validado = '" + pin_validado + "' ,Pro_Pu_fechai = '" + pro_pu_fechai + "' ,Pro_Pu_fechat = '" + pro_pu_fechat + "' ,Pro_Pu_responsable = '" + pro_pu_responsable + "' ,Pro_Pu_validado = '" + pro_pu_validado + "' ,Pro_Goma_fechai = '" + pro_gom_fechai + "' ,Pro_Goma_fechat = '" + pro_gom_fechat + "' ,Pro_Goma_responsable = '" + pro_gom_responsable + "',Pro_Goma_validado = '" + pro_gom_validado + "'   WHERE Id= " + ID + "; ";
    console.log('----------inicio--------');
    console.log(querysalida);
    console.log('----------final--------');

    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(querysalida).then(function (recordset) {
            conn.close();
        }).catch(function (err) { console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err); });

    res.redirect('/modificacion.html');
});

router.post('/alter/6', checkAuth, function (req, res) {
    console.log("alter 6"); 
    var cu_fecha = req.body.cu_fecha;
    var cu_res = req.body.cu_res;
    var cu_val = req.body.cu_val;    
    var lab_fecha = req.body.lab_fecha;
    var lab_res = req.body.lab_res;
    var lab_val = req.body.lab_val;
    var co_fecha = req.body.co_fecha;    
    var co_res = req.body.co_res;
    var co_val = req.body.co_val;
    var ext_fecha = req.body.ext_fecha;
    var ext_res = req.body.ext_res;    
    var ext_val = req.body.ext_val;
    var cli_fecha = req.body.cli_fecha;
    var cli_res = req.body.cli_res;
    var cli_val = req.body.cli_val;    
    var ter_fecha = req.body.ter_fecha;
    var ter_res = req.body.ter_res;
    var ter_val = req.body.ter_val;

    var querysalida = "Update Control_calidad2 set Curvas_fecha = '" + cu_fecha + "',Curvas_responsable = '" + cu_res + "',Curvas_validado = '" + cu_val + "',Lab_fecha = '" + lab_fecha + "',Lab_responsable = '" + lab_res + "',Lab_validado = '" + lab_val + "',Control_fecha = '" + co_fecha + "',Control_responsable = '" + co_res + "',Control_validado = '" + co_val + "',Ext_fecha = '" + ext_fecha + "',Ext_responsable = '" + ext_res + "', Ext_validado = '" + ext_val + "',Lib_cli_fecha = '" + cli_fecha + "' ,Lib_cli_responsable = '" + cli_res + "' ,Lib_cli_validado = '" + cli_val + "',Lib_ter_fecha = '" + ter_fecha + "',Lib_ter_responsable = '" + ter_res + "' ,Lib_ter_validado  = '" + ter_val + "'  WHERE Id= " + ID + "; ";
    console.log('----------inicio--------');
    console.log(querysalida);
    console.log('----------final--------');

    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(querysalida).then(function (recordset) {
            conn.close();
        }).catch(function (err) { console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err); });

    res.redirect('/modificacion.html');
});

router.post('/alter/7', checkAuth, function (req, res) {
    console.log("alter 7");
    var ruta_fecha = req.body.ruta_fecha;
    var ruta_resp = req.body.ruta_resp;
    var ruta_val = req.body.ruta_val;    
    var tra_fecha = req.body.tra_fecha;
    var tra_resp = req.body.tra_resp;
    var tra_val = req.body.tra_val;
    var rec_fecha = req.body.rec_fecha;    
    var rec_resp = req.body.rec_resp;
    var rec_val = req.body.rec_val;

    var querysalida = "Update Despacho_proyecto2 set Trazado_fecha = '" + ruta_fecha + "' ,Trazado_responsable = '" + ruta_resp + "' ,Trazado_validado = '" + ruta_val + "' ,Transporte_fecha = '" + tra_fecha + "'  ,Transporte_responsable = '" + tra_resp + "'  ,Transporte_validado = '" + tra_val + "' ,Recepcion_fecha = '" + rec_fecha + "'  ,Recepcion_responsable = '" + rec_resp + "' ,Recepcion_validado = '" + rec_val + "' WHERE Id= " + ID + "; ";
    console.log('----------inicio--------');
    console.log(querysalida);
    console.log('----------final--------');

    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(querysalida).then(function (recordset) {
            conn.close();
        }).catch(function (err) { console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err); });

    res.redirect('/modificacion.html');
});

router.post('/alter/8', checkAuth, function (req, res) {
    console.log("alter 8");
    var c_con = req.body.c_con;
    var c_ver = req.body.c_ver;
    var c_val = req.body.c_val;    
    var c_res = req.body.c_res;
    var c_func = req.body.c_func;
    var c_dem = req.body.c_dem;
    var c_nor = req.body.c_nor;    
    var c_leg = req.body.c_leg;
    var c_reg = req.body.c_reg;

    var ac_correctiva = req.body.ac_correctiva;
    var fo_accion = req.body.fo_accion;

    var querysalida = "Update  Validacion_salidas2 set Ccontroles = " + c_con + ",Cverificaciones = " + c_ver + " ,Cvalidaciones = " + c_val + " ,Cresponsable = '" + c_res + "' ,Cfuncionales = " + c_func + " ,Cdesempeno = " + c_dem + " ,Cnormativos = " + c_nor + ",Clegales = " + c_leg + " ,Creglamentarios = " + c_reg + " ,No_accion = '" + ac_correctiva + "' ,No_folio = '" + fo_accion + "' WHERE Id= " + ID + "; ";
    console.log('----------inicio--------');
    console.log(querysalida);
    console.log('----------final--------');

    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(querysalida).then(function (recordset) {
            conn.close();
        }).catch(function (err) { console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err); });

    res.redirect('/modificacion.html');
});

router.post('/alter/9', checkAuth, function (req, res) {
    console.log("alter 9");
    var nombre = req.body.nombre;
    var area = req.body.area;
    var mail = req.body.mail;    
    var fechae = req.body.fechae;
    var factura = req.body.factura;
    var fechap = req.body.fechap;

    var querysalida = "Update Validacion_final2 set Nombre = '" + nombre + "' ,Area = '" + area + "' ,Mail = " + mail + "  ,Factura = " + factura + " ,FechaE = '" + fechae + "',FechaP  = '" + fechap + "' WHERE Id= " + ID + "; ";


    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(querysalida).then(function (recordset) {
            conn.close();
        }).catch(function (err) { console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err); });

    res.redirect('/modificacion.html');
});

router.post('/alter/10', checkAuth, function (req, res) {
    console.log("alter 10");
    var cambio = req.body.cambio;
    var codigo = req.body.codigo;
    var fecha_solicitud = req.body.fecha_solicitud;    
    var fecha_cierre = req.body.fecha_cierre;
    var des_por = req.body.des_por;
    var ver_por = req.body.ver_por;   
    var val_por = req.body.val_por;   

    var querysalida = "Update Control_cambios2 set Fecha_solicitud = '" + fecha_solicitud + "' ,Fecha_cierre = '" + fecha_cierre + "' ,Cambio_solicitado = '" + cambio + "' ,Verificado_por = '" + ver_por + "' ,Validado_por = '" + val_por + "' ,Desarrollado_por = '" + des_por + "' ,Nuevo_codigo = '" + codigo + "' WHERE Id= " + ID + "; ";
    console.log('----------inicio--------');
    console.log(querysalida);
    console.log('----------final--------');

    var conn = new sql.Connection(dbConfig);
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query(querysalida).then(function (recordset) {
            conn.close();
        }).catch(function (err) { console.log(err); conn.close(); });
    }).catch(function (err) { console.log(err); });

    res.redirect('/modificacion.html');
});

module.exports = router;