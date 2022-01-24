// requiriendo express
var express = require('express');
//ejecutando router de express y guardandolo en la variable router
var router = express.Router();
// requiriendo fs
var fs=require("fs")
//leyendo ingreso.json y guardandolo en la varible usuario ya parseado
let usuarios=fs.readFileSync('ingreso.json',{encoding:'utf8'});
let usuario=JSON.parse(usuarios)
/* GET users listing. */
// enviando formulario por get y renderisando operaciones pasandole la variable condition y usuario que es el JSON parseado
router.get('/', function(req, res, next) {
 let condition=1
 
  res.render('operaciones',{condition,usuario})
});

// mandando por post la misma ruta que con get    
router.post('/', function(req, res, next) {
 //capturando los datos del formulario con req body
  const {consepto,monto,fecha,condicion} = req.body;
 //guardando el json parciado en el array op
  var op = new Array(); 
  op=JSON.parse(fs.readFileSync('ingreso.json',{encoding:'utf8'}))
 //creando un if para saber si la opcion es 1 (ingreso) o 2(egreso) y guarando en la variable tipo
  var tipo=""       
 if(condicion=="1"){
 tipo="ingreso"
 }else {
 tipo="egreso"
 }
 //generando un id que sea un numero despues del id del ultimo elemento
 let id=Number(op.usuario[op.usuario.length-1].id)+1
 //creando el objeto literal nuevo y pusheandolo en el array op.usuario
 var nuevo=
               {id,consepto,
               monto,
               fecha,
            tipo}
               op.usuario.push(nuevo)
           
               //rescribiendo el json ingreso.json con el objeto literal op stringificado
           fs.writeFile("ingreso.json",JSON.stringify(op),error=>{
             if(error){
               console.log("error")
              
             }
             else
             console.log("funciona")
           })
  
  
  res.redirect('/')
});
//enviando por get a editar 
router.get('/editar', function(req, res, next) {
//creando variable contition y editar
 var condition=0
 var editar=1
 //renderisando index con las variables condition editar y usuario que es el json pareado
  res.render('index',{usuario,condition,editar})
});
//enviando por get el id que es la posicion del array 
router.get('/:id', function(req, res, next) {
 //creando el array op cargandole el json  parseado
  var op = new Array();
 op=JSON.parse(fs.readFileSync('ingreso.json',{encoding:'utf8'}))
 // guardando en operacion el objeto literal dentro del array y creando la variable condition
 var operacion=op.usuario[req.params.id]
 var condition=0
//renderisando operaciones pasandole las variables operacion que es el elemento dentro del array del json y condition 
  res.render('operaciones',{operacion,condition});
});
//enviando por put los datos de  el formulario a editar
router.put('/:id',function(req, res, next) {
  var array = new Array();
 //recuperando por req body los datos del formumario
  const {consepto,monto,fecha} = req.body
//leyendo y parsiando el json guardandolo en el array 
 array=JSON.parse(fs.readFileSync('ingreso.json',{encoding:'utf8'}))
 //buscando y iterando el elemento que coincida con el id
 for(i=0;i<array.usuario.length;i++){
   if(req.params.id==array.usuario[i].id){
     var id=i
   }else{

   }
 }
//creando la variable tipo y cargandole la condicion de ingreso o egreso
let tipo=array.usuario[id].tipo
//creando el objeto literal nuevo on el id consepto fecha tipo
var nuevo=

{id,consepto,
monto,
fecha,
tipo}
//cargando el objeto literal dentro del array
 array.usuario[id]=nuevo
 
 //rescribiendo el nuevo array en el json
fs.writeFile("ingreso.json",JSON.stringify(array),error=>{
  if(error){
    console.log("error")
   
  }
  else
  console.log("funciona")
})
 //redirigiendo a la pagina de inicio
 res.redirect("/")
 
});

//mandando por delete al objeto a eliminar
router.delete('/eliminar/:id',function(req, res, next) {
  var array = new Array();
 //parseando el json y mandandolo al array
 array=JSON.parse(fs.readFileSync('ingreso.json',{encoding:'utf8'}))
 //iterando el array y buscando el elemento que coincide con el id pasado por parametro
 for(i=0;i<array.usuario.length;i++){
 
if(req.params.id==array.usuario[i].id){
var id=i
}else{


}



}



 //elimino con el metodo splice del array el elemento que coincida con el id por parametro
array.usuario.splice(id,1)
//reescribo el json
 fs.writeFile("ingreso.json",JSON.stringify(array),error=>{
  if(error){
    console.log("error")
              
  }
  else
  console.log("funciona")
})
   //redirijo a la pagina principal
 res.redirect("/")
 
});
module.exports = router;


