var express = require('express');
const { json } = require('express/lib/response');
var router = express.Router();
const fs=require('fs');
let usuarios=fs.readFileSync('ingreso.json',{encoding:'utf8'});
let usuario=JSON.parse(usuarios)

/* GET home page. */
router.get('/', function(req, res, next) {
  //create the variable suma=0
  var suma=0
 //iterate the json and if the type is "ingreso" the sum and if it type is "egreso" the rest in the sum variable
  for(i=0;i<usuario.usuario.length;i++){
if(usuario.usuario[i].tipo=="ingreso"){
suma=parseInt(usuario.usuario[i].monto)+parseInt(suma)
 }else{
suma=-parseInt(usuario.usuario[i].monto)+parseInt(suma)
 }};
var editar=0
var condition=1
 //render index and send the variables usuario suma editar and condition
res.render('index',{usuario,suma,editar,condition});
});

 
module.exports = router;