var express = require('express');
var router = express.Router();
var session = require('express-session');
var fs = require('fs');
var htmlToPdf = require('html-to-pdf');
var path = require('path');
var ejs = require('ejs');

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
var nombre_completo;

function checkAuth(req, res, next) {

    if (!req.session.ID) {
        res.send('No esta autorizado para ver esta pagina');
    } else if (req.session.registro === 0) {
        res.send('No ha buscado ver ningun registro en especifico');
    } else {
        
        
        next();
    }
}

//Notas
//resultado 90 fue saltado
//VB_desarollado (con una sola r?)
//



router.get('/id/*', function (req, res) {
    var ID;
    var Url = req.originalUrl;
    ID = Url.replace('/modificacion.html/id/', '');
    req.session.registro = ID;
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
    permiso10 = req.session.permiso10,
    
    //res.send(ID)
    res.redirect('/redirect/modificacion');
});



router.get('/', checkAuth, function (req, res) {
    console.log(req.session.nombre.replace('"', '').replace('"', '').replace('"', '').replace('"', ''))
    nombre_completo = req.session.nombre.replace('"', '').replace('"', '').replace('"', '').replace('"', '');
    var ID = req.session.registro
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
                                                            req.query("select * from Solicitud2 where Id= " + ID + ";").then(function (query14) {

                                                            var resultado = [];
                                                            resultado[1]= JSON.stringify(recordset[0].Id).replace('"', '').replace('"', '')
                                                            resultado[2]= JSON.stringify(recordset[0].Requisitos_funcionales).replace('"', '').replace('"', '')
                                                            resultado[3]= JSON.stringify(recordset[0].Requisitos_desempeño).replace('"', '').replace('"', '')
                                                            resultado[4]= JSON.stringify(recordset[0].Requisitos_normativo).replace('"', '').replace('"', '')
                                                            resultado[5]= JSON.stringify(recordset[0].Requisitos_legales).replace('"', '').replace('"', '')
                                                            resultado[6]= JSON.stringify(recordset[0].Requisitos_reglamentarios).replace('"', '').replace('"', '')
                                                            resultado[7]= JSON.stringify(recordset[0].IA_Muestra_fisica).replace('"', '').replace('"', '')
                                                            resultado[8]= JSON.stringify(recordset[0].EP_Muestra_fisica).replace('"', '').replace('"', '')
                                                            resultado[9]= JSON.stringify(recordset[0].Fecha_Muestra_fisica).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[10]= JSON.stringify(recordset[0].IA_Fotografia).replace('"', '').replace('"', '')
                                                            resultado[11]= JSON.stringify(recordset[0].EP_Fotografia).replace('"', '').replace('"', '')
                                                            resultado[12]= JSON.stringify(recordset[0].Fecha_Fotografia).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[13]= JSON.stringify(recordset[0].IA_Planos_adjuntos).replace('"', '').replace('"', '')
                                                            resultado[14]= JSON.stringify(recordset[0].EP_Planos_adjuntos).replace('"', '').replace('"', '')
                                                            resultado[15]= JSON.stringify(recordset[0].Fecha_Planos_adjuntos).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[16]= JSON.stringify(recordset[0].IA_Levantamientos_medidas).replace('"', '').replace('"', '')
                                                            resultado[17]= JSON.stringify(recordset[0].EP_Levantamientos_medidas).replace('"', '').replace('"', '')
                                                            resultado[18]= JSON.stringify(recordset[0].Fecha_Levantamientos_medidas).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[19]= JSON.stringify(recordset[0].Descripcion_Tecnica).replace('"', '').replace('"', '')
                                                            resultado[20]= JSON.stringify(recordset[0].Potenciales_fallas).replace('"', '').replace('"', '')

                                                            resultado[206]= JSON.stringify(recordset[0].IA_Mail_respaldo).replace('"', '').replace('"', '')
                                                            resultado[207]= JSON.stringify(recordset[0].EP_Mail_respaldo).replace('"', '').replace('"', '')
                                                            resultado[208]= JSON.stringify(recordset[0].Fecha_Mail_respaldo).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')

                                                            resultado[21]= JSON.stringify(query2[0].Fecha_inicio).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[22]= JSON.stringify(query2[0].Fecha_termino).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[23]= JSON.stringify(query2[0].NC_conceptual).replace('"', '').replace('"', '')
                                                            resultado[24]= JSON.stringify(query2[0].NC_basica).replace('"', '').replace('"', '')
                                                            resultado[25]= JSON.stringify(query2[0].NC_detalles).replace('"', '').replace('"', '')
                                                            resultado[26]= JSON.stringify(query2[0].NC_3D).replace('"', '').replace('"', '')
                                                            resultado[27]= JSON.stringify(query2[0].RES_ing).replace('"', '').replace('"', '')
                                                            resultado[28]= JSON.stringify(query2[0].RES_proyectista).replace('"', '').replace('"', '')
                                                            resultado[29]= JSON.stringify(query2[0].RES_dibujante).replace('"', '').replace('"', '')
                                                            resultado[30]= JSON.stringify(query2[0].Rint_Rext).replace('"', '').replace('"', '')
                                                            resultado[31]= JSON.stringify(query2[0].Inf_adicional).replace('"', '').replace('"', '')
                                                            resultado[32]= JSON.stringify(query2[0].REQ_bosquejo).replace('"', '').replace('"', '')
                                                            resultado[33]= JSON.stringify(query2[0].REQ_levantamiento).replace('"', '').replace('"', '')
                                                            resultado[34]= JSON.stringify(query2[0].REQ_planos).replace('"', '').replace('"', '')
                                                            resultado[35]= JSON.stringify(query2[0].REQ_descripcion).replace('"', '').replace('"', '')
                                                            resultado[36]= JSON.stringify(query2[0].REQ_ensayos).replace('"', '').replace('"', '')

                                                            resultado[37]= JSON.stringify(query3[0].Fecha_inicio).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[38]= JSON.stringify(query3[0].Fecha_termino).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[39]= JSON.stringify(query3[0].NC_desarrollo).replace('"', '').replace('"', '')
                                                            resultado[40]= JSON.stringify(query3[0].NC_compuesto).replace('"', '').replace('"', '')
                                                            resultado[41]= JSON.stringify(query3[0].NC_utilizacion).replace('"', '').replace('"', '')
                                                            resultado[42]= JSON.stringify(query3[0].NC_factible).replace('"', '').replace('"', '')
                                                            resultado[43]= JSON.stringify(query3[0].RES_pu).replace('"', '').replace('"', '')
                                                            resultado[44]= JSON.stringify(query3[0].RES_gomas).replace('"', '').replace('"', '')
                                                            resultado[45]= JSON.stringify(query3[0].RES_produccion).replace('"', '').replace('"', '')
                                                            resultado[46]= JSON.stringify(query3[0].Rint_Rext).replace('"', '').replace('"', '')
                                                            resultado[47]= JSON.stringify(query3[0].Inf_adicional).replace('"', '').replace('"', '')
                                                            resultado[48]= JSON.stringify(query3[0].REQ_terreno).replace('"', '').replace('"', '')
                                                            resultado[49]= JSON.stringify(query3[0].REQ_moldes).replace('"', '').replace('"', '')
                                                            resultado[50]= JSON.stringify(query3[0].REQ_tecnica).replace('"', '').replace('"', '')
                                                            resultado[51]= JSON.stringify(query3[0].REQ_laboratorio).replace('"', '').replace('"', '')
                                                            resultado[52]= JSON.stringify(query3[0].REQ_ensayos).replace('"', '').replace('"', '')


                                                            resultado[53]= JSON.stringify(query4[0].Fecha_inicio).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[54]= JSON.stringify(query4[0].Fecha_termino).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[55]= JSON.stringify(query4[0].C_estado1).replace('"', '').replace('"', '')
                                                            resultado[56]= JSON.stringify(query4[0].C_estado2).replace('"', '').replace('"', '')
                                                            resultado[57]= JSON.stringify(query4[0].C_estado3).replace('"', '').replace('"', '')
                                                            resultado[58]= JSON.stringify(query4[0].C_estado4).replace('"', '').replace('"', '')
                                                            resultado[209]= JSON.stringify(query4[0].C_estado5).replace('"', '').replace('"', '')
                                                            resultado[59]= JSON.stringify(query4[0].C_fecha1).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[60]= JSON.stringify(query4[0].C_fecha2).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[61]= JSON.stringify(query4[0].C_fecha3).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[62]= JSON.stringify(query4[0].C_fecha4).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[210]= JSON.stringify(query4[0].C_fecha5).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[63]= JSON.stringify(query4[0].C_controlado1).replace('"', '').replace('"', '')
                                                            resultado[64]= JSON.stringify(query4[0].C_controlado2).replace('"', '').replace('"', '')
                                                            resultado[65]= JSON.stringify(query4[0].C_controlado3).replace('"', '').replace('"', '')
                                                            resultado[66]= JSON.stringify(query4[0].C_controlado4).replace('"', '').replace('"', '')
                                                            resultado[211]= JSON.stringify(query4[0].C_controlado5).replace('"', '').replace('"', '')
                                                            resultado[67]= JSON.stringify(query4[0].C_ajuste1).replace('"', '').replace('"', '')
                                                            resultado[68]= JSON.stringify(query4[0].C_ajuste2).replace('"', '').replace('"', '')
                                                            resultado[69]= JSON.stringify(query4[0].C_ajuste3).replace('"', '').replace('"', '')
                                                            resultado[70]= JSON.stringify(query4[0].C_ajuste4).replace('"', '').replace('"', '')
                                                            resultado[212]= JSON.stringify(query4[0].C_ajuste5).replace('"', '').replace('"', '')
                                                            resultado[71]= JSON.stringify(query4[0].VB_desarollado_nombre).replace('"', '').replace('"', '')
                                                            resultado[72]= JSON.stringify(query4[0].VB_desarollado_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[73]= JSON.stringify(query4[0].VB_desarollado_cargo).replace('"', '').replace('"', '')
                                                            resultado[74]= JSON.stringify(query4[0].VB_verificado_nombre).replace('"', '').replace('"', '')
                                                            resultado[75]= JSON.stringify(query4[0].VB_verificado_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[76]= JSON.stringify(query4[0].VB_verificado_cargo).replace('"', '').replace('"', '')
                                                            resultado[77]= JSON.stringify(query4[0].VB_validado_nombre).replace('"', '').replace('"', '')
                                                            resultado[78]= JSON.stringify(query4[0].VB_validado_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[79]= JSON.stringify(query4[0].VB_validado_cargo).replace('"', '').replace('"', '')

                                                            resultado[81]= JSON.stringify(query5[0].Fecha_inicio).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[82]= JSON.stringify(query5[0].Fecha_termino).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[83]= JSON.stringify(query5[0].C_estado1).replace('"', '').replace('"', '')
                                                            resultado[84]= JSON.stringify(query5[0].C_estado2).replace('"', '').replace('"', '')
                                                            resultado[85]= JSON.stringify(query5[0].C_estado3).replace('"', '').replace('"', '')
                                                            resultado[86]= JSON.stringify(query5[0].C_estado4).replace('"', '').replace('"', '')
                                                            resultado[213]= JSON.stringify(query5[0].C_estado5).replace('"', '').replace('"', '')
                                                            resultado[87]= JSON.stringify(query5[0].C_fecha1).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[88]= JSON.stringify(query5[0].C_fecha2).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[89]= JSON.stringify(query5[0].C_fecha3).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[90]= JSON.stringify(query5[0].C_fecha4).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[214]= JSON.stringify(query5[0].C_fecha5).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[91]= JSON.stringify(query5[0].C_controlado1).replace('"', '').replace('"', '')
                                                            resultado[92]= JSON.stringify(query5[0].C_controlado2).replace('"', '').replace('"', '')
                                                            resultado[93]= JSON.stringify(query5[0].C_controlado3).replace('"', '').replace('"', '')
                                                            resultado[94]= JSON.stringify(query5[0].C_controlado4).replace('"', '').replace('"', '')
                                                            resultado[215]= JSON.stringify(query5[0].C_controlado5).replace('"', '').replace('"', '')
                                                            resultado[95]= JSON.stringify(query5[0].C_ajuste1).replace('"', '').replace('"', '')
                                                            resultado[96]= JSON.stringify(query5[0].C_ajuste2).replace('"', '').replace('"', '')
                                                            resultado[97]= JSON.stringify(query5[0].C_ajuste3).replace('"', '').replace('"', '')
                                                            resultado[98]= JSON.stringify(query5[0].C_ajuste4).replace('"', '').replace('"', '')
                                                            resultado[216]= JSON.stringify(query5[0].C_ajuste5).replace('"', '').replace('"', '')
                                                            resultado[99]= JSON.stringify(query5[0].VB_desarollado_nombre).replace('"', '').replace('"', '')
                                                            resultado[100]= JSON.stringify(query5[0].VB_desarollado_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[101]= JSON.stringify(query5[0].VB_desarollado_cargo).replace('"', '').replace('"', '')
                                                            resultado[102]= JSON.stringify(query5[0].VB_verificado_nombre).replace('"', '').replace('"', '')
                                                            resultado[103]= JSON.stringify(query5[0].VB_verificado_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[104]= JSON.stringify(query5[0].VB_verificado_cargo).replace('"', '').replace('"', '')
                                                            resultado[105]= JSON.stringify(query5[0].VB_validado_nombre).replace('"', '').replace('"', '')
                                                            resultado[106]= JSON.stringify(query5[0].VB_validado_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[107]= JSON.stringify(query5[0].VB_validado_cargo).replace('"', '').replace('"', '')
                                                            resultado[108]= JSON.stringify(query5[0].Codificacion_asignada).replace('"', '').replace('"', '')

                                                            resultado[109]= JSON.stringify(query6[0].Entrega_nombre).replace('"', '').replace('"', '')
                                                            resultado[110]= JSON.stringify(query6[0].Entrega_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[111]= JSON.stringify(query6[0].Entrega_cargo).replace('"', '').replace('"', '')
                                                            resultado[112]= JSON.stringify(query6[0].Realizacion_nombre).replace('"', '').replace('"', '')
                                                            resultado[113]= JSON.stringify(query6[0].Realizacion_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[114]= JSON.stringify(query6[0].Realizacion_cargo).replace('"', '').replace('"', '')
                                                            resultado[115]= JSON.stringify(query6[0].Validacion_nombre).replace('"', '').replace('"', '')
                                                            resultado[116]= JSON.stringify(query6[0].Validacion_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[117]= JSON.stringify(query6[0].Validacion_cargo).replace('"', '').replace('"', '')
                                                            resultado[118]= JSON.stringify(query6[0].Aprobacion_nombre).replace('"', '').replace('"', '')
                                                            resultado[119]= JSON.stringify(query6[0].Aprobacion_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[120]= JSON.stringify(query6[0].Aprobacion_cargo).replace('"', '').replace('"', '')

                                                            resultado[121]= JSON.stringify(query7[0].Prep_Pu_fechai).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[122]= JSON.stringify(query7[0].Prep_Pu_fechat).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[123]= JSON.stringify(query7[0].Prep_Pu_responsable).replace('"', '').replace('"', '')
                                                            resultado[124]= JSON.stringify(query7[0].Prep_Pu_validado).replace('"', '').replace('"', '')
                                                            resultado[125]= JSON.stringify(query7[0].Prep_Goma_fechai).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[126]= JSON.stringify(query7[0].Prep_Goma_fechat).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[127]= JSON.stringify(query7[0].Prep_Goma_responsable).replace('"', '').replace('"', '')
                                                            resultado[128]= JSON.stringify(query7[0].Prep_Goma_validado).replace('"', '').replace('"', '')
                                                            resultado[129]= JSON.stringify(query7[0].Fab_fechai).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[130]= JSON.stringify(query7[0].Fab_fechat).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[131]= JSON.stringify(query7[0].Fab_responsable).replace('"', '').replace('"', '')
                                                            resultado[132]= JSON.stringify(query7[0].Fab_validado).replace('"', '').replace('"', '')
                                                            resultado[133]= JSON.stringify(query7[0].Gra_fechai).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[134]= JSON.stringify(query7[0].Gra_fechat).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[135]= JSON.stringify(query7[0].Gra_responsable).replace('"', '').replace('"', '')
                                                            resultado[136]= JSON.stringify(query7[0].Gra_validado).replace('"', '').replace('"', '')
                                                            resultado[137]= JSON.stringify(query7[0].PyA_fechai).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[138]= JSON.stringify(query7[0].PyA_fechat).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[139]= JSON.stringify(query7[0].PyA_responsable).replace('"', '').replace('"', '')
                                                            resultado[140]= JSON.stringify(query7[0].PyA_validado).replace('"', '').replace('"', '')
                                                            resultado[141]= JSON.stringify(query7[0].Pro_Pu_fechai).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[142]= JSON.stringify(query7[0].Pro_Pu_fechat).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[143]= JSON.stringify(query7[0].Pro_Pu_responsable).replace('"', '').replace('"', '')
                                                            resultado[144]= JSON.stringify(query7[0].Pro_Pu_validado).replace('"', '').replace('"', '')
                                                            resultado[145]= JSON.stringify(query7[0].PyA_validado).replace('"', '').replace('"', '')
                                                            resultado[146]= JSON.stringify(query7[0].Pro_Goma_fechai).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[147]= JSON.stringify(query7[0].Pro_Goma_fechat).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[148]= JSON.stringify(query7[0].Pro_Goma_responsable).replace('"', '').replace('"', '')
                                                            resultado[149]= JSON.stringify(query7[0].Pro_Goma_validado).replace('"', '').replace('"', '')


                                                            resultado[150]= JSON.stringify(query8[0].Curvas_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[151]= JSON.stringify(query8[0].Curvas_responsable).replace('"', '').replace('"', '')
                                                            resultado[152]= JSON.stringify(query8[0].Curvas_validado).replace('"', '').replace('"', '')
                                                            resultado[153]= JSON.stringify(query8[0].Lab_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[154]= JSON.stringify(query8[0].Lab_responsable).replace('"', '').replace('"', '')
                                                            resultado[155]= JSON.stringify(query8[0].Lab_validado).replace('"', '').replace('"', '')
                                                            resultado[156]= JSON.stringify(query8[0].Control_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[157]= JSON.stringify(query8[0].Control_responsable).replace('"', '').replace('"', '')
                                                            resultado[158]= JSON.stringify(query8[0].Control_validado).replace('"', '').replace('"', '')
                                                            resultado[159]= JSON.stringify(query8[0].Ext_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', ''),
                                                            resultado[160]= JSON.stringify(query8[0].Ext_responsable).replace('"', '').replace('"', '')
                                                            resultado[161]= JSON.stringify(query8[0].Ext_validado).replace('"', '').replace('"', '')
                                                            resultado[162]= JSON.stringify(query8[0].Lib_cli_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[163]= JSON.stringify(query8[0].Lib_cli_responsable).replace('"', '').replace('"', '')
                                                            resultado[164]= JSON.stringify(query8[0].Lib_cli_validado).replace('"', '').replace('"', '')
                                                            resultado[165]= JSON.stringify(query8[0].Lib_ter_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[166]= JSON.stringify(query8[0].Lib_ter_responsable).replace('"', '').replace('"', '')
                                                            resultado[167]= JSON.stringify(query8[0].Lib_ter_validado).replace('"', '').replace('"', '')


                                                            resultado[168]= JSON.stringify(query9[0].Trazado_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', ''),
                                                            resultado[169]= JSON.stringify(query9[0].Trazado_responsable).replace('"', '').replace('"', '')
                                                            resultado[170]= JSON.stringify(query9[0].Trazado_validado).replace('"', '').replace('"', '')
                                                            resultado[171]= JSON.stringify(query9[0].Transporte_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[172]= JSON.stringify(query9[0].Transporte_responsable).replace('"', '').replace('"', '')
                                                            resultado[173]= JSON.stringify(query9[0].Transporte_validado).replace('"', '').replace('"', '')
                                                            resultado[174]= JSON.stringify(query9[0].Recepcion_fecha).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[175]= JSON.stringify(query9[0].Recepcion_responsable).replace('"', '').replace('"', '')
                                                            resultado[176]= JSON.stringify(query9[0].Recepcion_validado).replace('"', '').replace('"', '')

                                                            resultado[177]= JSON.stringify(query10[0].Ccontroles).replace('"', '').replace('"', '')
                                                            resultado[178]= JSON.stringify(query10[0].Cverificaciones).replace('"', '').replace('"', '')
                                                            resultado[179]= JSON.stringify(query10[0].Cvalidaciones).replace('"', '').replace('"', '')
                                                            resultado[180]= JSON.stringify(query10[0].Cresponsable).replace('"', '').replace('"', '')
                                                            resultado[181]= JSON.stringify(query10[0].Cfuncionales).replace('"', '').replace('"', '')
                                                            resultado[182]= JSON.stringify(query10[0].Cdesempeno).replace('"', '').replace('"', '')
                                                            resultado[183]= JSON.stringify(query10[0].Cnormativos).replace('"', '').replace('"', '')
                                                            resultado[184]= JSON.stringify(query10[0].Clegales).replace('"', '').replace('"', '')
                                                            resultado[185]= JSON.stringify(query10[0].Creglamentarios).replace('"', '').replace('"', '')
                                                            resultado[186]= JSON.stringify(query10[0].No_accion).replace('"', '').replace('"', '')
                                                            resultado[187]= JSON.stringify(query10[0].No_folio).replace('"', '').replace('"', '')

                                                            resultado[188]= JSON.stringify(query11[0].Nombre).replace('"', '').replace('"', '')
                                                            resultado[189]= JSON.stringify(query11[0].Area).replace('"', '').replace('"', '')
                                                            resultado[190]= JSON.stringify(query11[0].Mail).replace('"', '').replace('"', '')
                                                            resultado[191]= JSON.stringify(query11[0].Factura).replace('"', '').replace('"', '')
                                                            resultado[192]= JSON.stringify(query11[0].FechaE).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[193]= JSON.stringify(query11[0].FechaP).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')

                                                            resultado[194]= JSON.stringify(query12[0].Fecha_solicitud).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[195]= JSON.stringify(query12[0].Fecha_cierre).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[196]= JSON.stringify(query12[0].Cambio_solicitado).replace('"', '').replace('"', '')
                                                            resultado[197]= JSON.stringify(query12[0].Verificado_por).replace('"', '').replace('"', '')
                                                            resultado[198]= JSON.stringify(query12[0].Validado_por).replace('"', '').replace('"', '')
                                                            resultado[199]= JSON.stringify(query12[0].Desarrollado_por).replace('"', '').replace('"', '')
                                                            resultado[200]= JSON.stringify(query12[0].Nuevo_codigo).replace('"', '').replace('"', '')
                                                            resultado[217]= JSON.stringify(query12[0].N_revision).replace('"', '').replace('"', '')

                                                            resultado[201]= JSON.stringify(query13[0].Proyecto).replace('"', '').replace('"', '')
                                                            resultado[202]= JSON.stringify(query13[0].Cliente).replace('"', '').replace('"', '')
                                                            resultado[203]= (JSON.stringify(query13[0].Fecha_ingreso).replace('"', '').replace('"', '').replace('T00:00:00.000Z', ''))

                                                            resultado[204]= JSON.stringify(query13[0].Codigo).replace('"', '').replace('"', '')
                                                            resultado[205] = JSON.stringify(query13[0].Estado).replace('"', '').replace('"', '')

                                                            resultado[221] = JSON.stringify(query14[0].Fecha_ingreso).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[222] = JSON.stringify(query14[0].Fecha_modificacion).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[223] = JSON.stringify(query14[0].Nombre_proyecto).replace('"', '').replace('"', '')
                                                            resultado[224] = JSON.stringify(query14[0].Nombre_cliente).replace('"', '').replace('"', '')
                                                            resultado[225] = JSON.stringify(query14[0].Area).replace('"', '').replace('"', '')
                                                            resultado[226] = JSON.stringify(query14[0].Fecha_visita.replace('"', '').replace('"', '').replace('T00:00:00.000Z', ''))
                                                            resultado[227] = JSON.stringify(query14[0].Descripcion_proyecto).replace('"', '').replace('"', '')
                                                            resultado[228] = JSON.stringify(query14[0].cod_cliente).replace('"', '').replace('"', '')

                                                            resultado[229] = JSON.stringify(query14[0].Fecha_entrega_proyecto).replace('"', '').replace('"', '').replace('T00:00:00.000Z', '')
                                                            resultado[230] = JSON.stringify(query14[0].nombre_vendedor).replace('"', '').replace('"', '')
                                                            resultado[231] = JSON.stringify(query14[0].Observacion_fallo).replace('"', '').replace('"', '')
                                                            resultado[232] = JSON.stringify(query14[0].Observacion_muefis).replace('"', '').replace('"', '')
                                                            resultado[233] = JSON.stringify(query14[0].Observacion_fot).replace('"', '').replace('"', '')
                                                            resultado[234] = JSON.stringify(query14[0].Observacion_plaadj).replace('"', '').replace('"', '')
                                                            resultado[235] = JSON.stringify(query14[0].Observacion_levmed).replace('"', '').replace('"', '')
                                                            
                                                            
                                                            for (var flag =1; flag<=217; flag++){
                                                                if (resultado[flag] == 'null'){
                                                                    resultado[flag] ="NAP";
                                                                }
                                                                else if (resultado[flag]=="true"){
                                                                    resultado[flag] ="SI"
                                                                }else if (resultado[flag]=="false"){
                                                                    resultado[flag] ="NO"
                                                                }

                                                                if (resultado[flag] == undefined) {
                                                                    resultado[flag] = "NAP";
                                                                }

                                                                resultado[flag] = resultado[flag].toUpperCase();
                                                                // console.log (resultado[flag])
                                                            }
                                                            res.render('modificacion', {
                                                                title: ID,
                                                                nombre_completo: nombre_completo,
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
                                                                resultado205: resultado[205],

                                                                resultado221: resultado[221],
                                                                resultado222: resultado[222],
                                                                resultado223: resultado[223],
                                                                resultado224: resultado[224],
                                                                resultado225: resultado[225],
                                                                resultado226: resultado[226],
                                                                resultado227: resultado[227],
                                                                resultado228: resultado[228]
                                                                
                                                            });
                                                             ejs.renderFile('./views/pdf.ejs', {

                                                                 title: ID,
                                                                 nombre_completo: nombre_completo,
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
                                                                 resultado205: resultado[205],

                                                                 resultado221: resultado[221],
                                                                 resultado222: resultado[222],
                                                                 resultado223: resultado[223],
                                                                 resultado224: resultado[224],
                                                                 resultado225: resultado[225],
                                                                 resultado226: resultado[226],
                                                                 resultado227: resultado[227],
                                                                 resultado228: resultado[228]
                                                             }, function (err, result) {
                                                                 fs.writeFile("./public/html/Registro_Validacion-"+resultado[1]+".html", result, function (err) {
                                                                     if (err) {
                                                                         return console.log(err);
                                                                     }
                                                                     console.log("The file was saved!");
                                                                 }); 
                                                                });
                                                             


                                                             ejs.renderFile('./views/orden_proyecto.ejs', {
                                                                 nombre_completo: nombre_completo,
                                                                 title: ID,
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
                                                                 resultado205: resultado[205],

                                                                 resultado221: resultado[221],
                                                                 resultado222: resultado[222],
                                                                 resultado223: resultado[223],
                                                                 resultado224: resultado[224],
                                                                 resultado225: resultado[225],
                                                                 resultado226: resultado[226],
                                                                 resultado227: resultado[227],
                                                                 resultado228: resultado[228],

                                                                 resultado229: resultado[229],
                                                                 resultado230: resultado[230],
                                                                 resultado231: resultado[231],
                                                                 resultado232: resultado[232],
                                                                 resultado233: resultado[233],
                                                                 resultado234: resultado[234],
                                                                 resultado235: resultado[235]
                                                                
                                                             }, function (err, result) {
                                                                 fs.writeFile("./public/html/Solicitud_Cliente-" + resultado[1] + ".html", result, function (err) {
                                                                     if (err) {
                                                                         return console.log(err);
                                                                     }
                                                                     console.log("The file was saved!");
                                                                 });
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

        }).catch(function (err) { console.log(err); conn.close(); })
    }).catch(function (err) { console.log(err); });
});

module.exports = router;
