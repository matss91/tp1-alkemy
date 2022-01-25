// require express
var express = require('express');
//executing express router and saving in the router variable
var router = express.Router();
// require fs
var fs=require("fs")
//reading ingreso.json and  saving it in the user variable already parse
let usuarios=fs.readFileSync('ingreso.json',{encoding:'utf8'});
let usuario=JSON.parse(usuarios)
/* GET users listing. */
// sending form by get and rendering operaciones passing the variable condition and usuario that is json parse
router.get('/', function(req, res, next) {
 let condition=1
 
  res.render('operaciones',{condition,usuario})
});

//sending by post the same router by get  
router.post('/', function(req, res, next) {
 //capturing form data with req body
  const {consepto,monto,fecha,condicion} = req.body;
 //saving the json parse in the op array
  var op = new Array(); 
  op=JSON.parse(fs.readFileSync('ingreso.json',{encoding:'utf8'}))
 //creating conditional to know if the type is ingreso or egreso and saving it
  var tipo=""       
 if(condicion=="1"){
 tipo="ingreso"
 }else {
 tipo="egreso"
 }
 //generating an id that is a number after the last id
 let id=Number(op.usuario[op.usuario.length-1].id)+1
 //creating the new objet literal and pushing it into the array by the op.usuario
 var nuevo=
               {id,consepto,
               monto,
               fecha,
            tipo}
               op.usuario.push(nuevo)
           
               //rewriting the json with the stringify objet literal
           fs.writeFile("ingreso.json",JSON.stringify(op),error=>{
             if(error){
               console.log("error")
              
             }
             else
             console.log("funciona")
           })
  
  
  res.redirect('/')
});
//sending by get to edit
router.get('/editar', function(req, res, next) {
//creating variable condition and edit
 var condition=0
 var editar=1
 //rendering index with the variables condition editar y usuario which is the parsed json
  res.render('index',{usuario,condition,editar})
});
//sending by get the id which is the position of the array
router.get('/:id', function(req, res, next) {
 //creating the op array loading the parsed json
  var op = new Array();
 op=JSON.parse(fs.readFileSync('ingreso.json',{encoding:'utf8'}))
 // saving in operation the literal object inside an array and creating the condition variable
 var operacion=op.usuario[req.params.id]
 var condition=0
//rendering operaciones by passing the variables operacion which is the element of the array and condition
  res.render('operaciones',{operacion,condition});
});
//sending by put the data of the form to edit
router.put('/:id',function(req, res, next) {
  var array = new Array();
 //recover the form data by req body
  const {consepto,monto,fecha} = req.body
//reading and parsing the json saving it in the array
 array=JSON.parse(fs.readFileSync('ingreso.json',{encoding:'utf8'}))
 //iterating the element and comparing it with the id
 for(i=0;i<array.usuario.length;i++){
   if(req.params.id==array.usuario[i].id){
     var id=i
   }else{

   }
 }
//creating the type variable and loading the ingreso or egreso
let tipo=array.usuario[id].tipo
//creating the new literal object with the id consepto fecha and tipo
var nuevo=

{id,consepto,
monto,
fecha,
tipo}
//loading object literal into array
 array.usuario[id]=nuevo
 
 //rewriting the new array in the json
fs.writeFile("ingreso.json",JSON.stringify(array),error=>{
  if(error){
    console.log("error")
   
  }
  else
  console.log("funciona")
})
 //redirecting to home
 res.redirect("/")
 
});

//sending by delete the position of the array to delete
router.delete('/eliminar/:id',function(req, res, next) {
  var array = new Array();
 //parsing the json and saving it to the array
 array=JSON.parse(fs.readFileSync('ingreso.json',{encoding:'utf8'}))
 //iterating the array and looking for the element that matches the id passed by parameter
 for(i=0;i<array.usuario.length;i++){
 
if(req.params.id==array.usuario[i].id){
var id=i
}else{


}



}



 //remove with the splice method from the array the element that matches the id passed by parameter
array.usuario.splice(id,1)
//rewrite the json
 fs.writeFile("ingreso.json",JSON.stringify(array),error=>{
  if(error){
    console.log("error")
              
  }
  else
  console.log("funciona")
})
   //redirect home
 res.redirect("/")
 
});
module.exports = router;


