var express = require('express');
var router = express.Router();
var fs=require("fs")
let usuarios=fs.readFileSync('ingreso.json',{encoding:'utf8'});
let usuario=JSON.parse(usuarios)
/* GET users listing. */
router.get('/', function(req, res, next) {
 let condition=1
 
  res.render('operaciones',{condition,usuario})
});


router.post('/', function(req, res, next) {
  const {consepto,monto,fecha,condicion} = req.body;
 
  var op = new Array(); 
  
 op=JSON.parse(fs.readFileSync('ingreso.json',{encoding:'utf8'}))
  var tipo=""       
 if(condicion=="1"){
 tipo="ingreso"
 }else {
 tipo="egreso"
 }
 let id=Number(op.usuario[op.usuario.length-1].id)+1
 
 var nuevo=
               {id,consepto,
               monto,
               fecha,
            tipo}
               op.usuario.push(nuevo)
           
               
           fs.writeFile("ingreso.json",JSON.stringify(op),error=>{
             if(error){
               console.log("error")
              
             }
             else
             console.log("funciona")
           })
  
  
  res.redirect('/')
});

router.get('/editar', function(req, res, next) {
 var condition=0
 var editar=1
  res.render('index',{usuario,condition,editar})
});
router.get('/:id', function(req, res, next) {
  var op = new Array();
 
  op=JSON.parse(fs.readFileSync('ingreso.json',{encoding:'utf8'}))
 var operacion=op.usuario[req.params.id]
 var condition=0

  res.render('operaciones',{operacion,condition});
});

router.put('/:id',function(req, res, next) {
  var array = new Array();
  const {consepto,monto,fecha} = req.body

 array=JSON.parse(fs.readFileSync('ingreso.json',{encoding:'utf8'}))
 for(i=0;i<array.usuario.length;i++){
   if(req.params.id==array.usuario[i].id){
     var id=i
   }else{

   }
 }
let tipo=array.usuario[id].tipo

var nuevo=

{id,consepto,
monto,
fecha,
tipo}

 array.usuario[id]=nuevo
 
 
fs.writeFile("ingreso.json",JSON.stringify(array),error=>{
  if(error){
    console.log("error")
   
  }
  else
  console.log("funciona")
})
 
 res.redirect("/")
 
});


router.delete('/eliminar/:id',function(req, res, next) {
  var array = new Array();
 
 array=JSON.parse(fs.readFileSync('ingreso.json',{encoding:'utf8'}))
 for(i=0;i<array.usuario.length;i++){
 
if(req.params.id==array.usuario[i].id){
var id=i
}else{


}



}



 array=JSON.parse(fs.readFileSync('ingreso.json',{encoding:'utf8'}))
array.usuario.splice(id,1)

 fs.writeFile("ingreso.json",JSON.stringify(array),error=>{
  if(error){
    console.log("error")
              
  }
  else
  console.log("funciona")
})
   
 res.redirect("/")
 
});
module.exports = router;


