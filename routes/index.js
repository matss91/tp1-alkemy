var express = require('express');
const { json } = require('express/lib/response');
var router = express.Router();
const fs=require('fs');
let usuarios=fs.readFileSync('ingreso.json',{encoding:'utf8'});
let usuario=JSON.parse(usuarios)

/* GET home page. */
router.get('/', function(req, res, next) {
  suma=new Number("0")
 for(i=0;i<usuario.usuario.length;i++){
if(usuario.usuario[i].tipo=="ingreso"){
suma=parseInt(usuario.usuario[i].monto)+parseInt(suma)
 }else{
suma=-parseInt(usuario.usuario[i].monto)+parseInt(suma)
 }};


 res.render('index',{usuario,suma});
});

 
module.exports = router;