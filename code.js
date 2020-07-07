var nameM=[
  0, "ENERO","FEBRERO","MARZO","ABRIL", "MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"
]
var nameD=[
  "DOMINGO","LUNES","MARTES","MIERCOLES","JUEVES","VIERNES","SABADO"
]
var diasxM=[
  0,31,28,31,30,31,30,31,31,30,31,30,31
]
var codM=[0,0,3,3,6,1,4,6,2,5,0,3,5]
var codD=[0,1,2,3,4,5,6]
var codS=[6,4,2,0]
var boleana=false;
var d,m,a
var calendario=document.getElementById("calendario-container");
var mensajeError=document.getElementById("mensaje-error");
var dateTitle=document.getElementById("date-title");
var agregarNombre
var nombresdeDias=document.getElementById("nombres-container");
var nuevaCasilla
var cuadricula=document.getElementById("cantidad-dias")

function errores() {
  if(isNaN(d)){
    mensajeError.innerText="";
    mensajeError.innerText="No se ingreso el día";
    mensajeError.style.display="block";
    return true;
  }
  if(isNaN(m)){
    mensajeError.innerText="";
    mensajeError.innerText="No se ingreso el mes";
    mensajeError.style.display="block";
    return true;
  }
  if(isNaN(a)){
    mensajeError.innerText="";
    mensajeError.innerText="No se ingreso el año";
    mensajeError.style.display="block";
    return true;
  }
  if(m<1||m>12){
    mensajeError.innerText="";
    mensajeError.innerText="Mes fuera de rango";
    mensajeError.style.display="block";
    return true;
  }
  if(d<1||d>diasxM[m]){
    mensajeError.innerText="";
    mensajeError.innerText="Dia fuera de rango";
    mensajeError.style.display="block";
    return true;
  }
  if(a<0||a>9e9){
    mensajeError.innerText="";
    mensajeError.innerText="Dia fuera de rango";
    mensajeError.style.display="block";
    return true;
  }
}
function buscar() {
  mensajeError.style.display="none";
  d=parseInt(document.getElementById("dia").value)
  m=parseInt(document.getElementById("mes").value)
  a=parseInt(document.getElementById("año").value)
  if(a%4==0)diasxM[2]=29
  else diasxM[2]=28
  if(errores())return;
  ///console.log(d,m,a);
  calendario.style.display="inline"

  var digA=a%100
  var sig=~~(a/100)
  var s=1+codM[m]+digA+(~~(digA/4))+codS[sig%4]
  s%=7
  var dia=d+codM[m]+digA+(~~(digA/4))+codS[sig%4]
  dia%=7

  dateTitle.innerText=(nameD[dia]+" "+d+" DE "+nameM[m]+" DEL "+a)
  nombresdeDias.innerHTML=""
  for (var i=0; i<7; i++){
    agregarNombre=document.createElement("div")
    agregarNombre.className="nombre"
    agregarNombre.innerText=(nameD[i][0]+nameD[i][1]+nameD[i][2])
    nombresdeDias.appendChild(agregarNombre)
  }
  var val=1-s
  cuadricula.innerHTML=""
  while(val<=diasxM[m]){
    ///console.log(val)
    for (var i=0; i<7; i++){
      nuevaCasilla=document.createElement("div")
      nuevaCasilla.className="fecha"
      if(val<1){
        if(m===1){
          nuevaCasilla.innerText=diasxM[12]-val
        }else{
          nuevaCasilla.innerText=diasxM[m-1]-val
        }
        nuevaCasilla.style.backgroundColor="#dddddd"
      }else if(val>diasxM[m]){
        nuevaCasilla.innerText=val-diasxM[m]
        nuevaCasilla.style.backgroundColor="#dddddd"
      }else{
        nuevaCasilla.innerText=val
      }
      if(val===d){
        nuevaCasilla.style.backgroundColor="#d0fbbf"
      }
      cuadricula.appendChild(nuevaCasilla)
      val++
    }
  }
  
}