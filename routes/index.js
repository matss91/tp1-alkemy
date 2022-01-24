var express = require('express');
const { json } = require('express/lib/response');
var router = express.Router();
const fs=require('fs');
let usuarios=fs.readFileSync('ingreso.json',{encoding:'utf8'});
let usuario=JSON.parse(usuarios)

/* GET home page. */
router.get('/', function(req, res, next) {
  //creo la variable suma=0
  var suma=0
 //itero el JSON y si el tipo es ingreso lo sumo y si es egreso lo resto
  for(i=0;i<usuario.usuario.length;i++){
if(usuario.usuario[i].tipo=="ingreso"){
suma=parseInt(usuario.usuario[i].monto)+parseInt(suma)
 }else{
suma=-parseInt(usuario.usuario[i].monto)+parseInt(suma)
 }};
var editar=0
var condition=1
 //renderiso index y le mando las variables usuario suma editar y eliminar
res.render('index',{usuario,suma,editar,condition});
});

 
module.exports = router;