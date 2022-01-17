var express = require('express');
var router = express.Router();
var fs=require("fs")
let usuarios="sdfsf"
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('operaciones',{usuarios})
});


router.post('/', function(req, res, next) {
  const {consepto,monto,fecha,condicion} = req.body;
 
  var op = new Array(); 
  
 op=JSON.parse(fs.readFileSync('ingreso.json',{encoding:'utf8'}))
         
 if(condicion=="1"){
let tipo="ingreso"
 }else {
let tipo="egreso"
 }
 
 
 var nuevo=
               {consepto,
               monto,
               fecha,
              condicion}
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
module.exports = router;


