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
var nuevaCasilla,casillaSeleccionada
var cuadricula=document.getElementById("cantidad-dias")
var digA,sig,val,s,dia

function pulsarDia(casilla){
  var enteroSeleccionado=parseInt(casillaSeleccionada.id.substring(3))
  ///console.log(enteroSeleccionado);
  casillaSeleccionada.style=""
  casillaSeleccionada=casilla
  casillaSeleccionada.style.backgroundColor="#d0fbbf"
  document.getElementById("dia").value=casillaSeleccionada.id.substring(3)
  var enteroSeleccionado=parseInt(casillaSeleccionada.id.substring(3))
  
  dia=enteroSeleccionado+codM[m]+digA+(~~(digA/4))+codS[sig%4]
  dia%=7
  if(a%4==0&&m<=2){
    dia--
    if(dia===-1)dia=6
  }
  dateTitle.innerText=(nameD[dia]+" "+enteroSeleccionado+" DE "+nameM[m]+" DEL "+a)
}

function filaNombres(){
  var mediaCss=window.matchMedia("(max-width: 745px)");
  nombresdeDias.innerHTML=""
  if(mediaCss.matches){
    for (var i=0; i<7; i++){
      agregarNombre=document.createElement("div")
      agregarNombre.className="nombre"
      agregarNombre.innerHTML=nameD[i][0]
      nombresdeDias.appendChild(agregarNombre)
    }
  }else{
    for (var i=0; i<7; i++){
      agregarNombre=document.createElement("div")
      agregarNombre.className="nombre"
      agregarNombre.innerText=(nameD[i][0]+nameD[i][1]+nameD[i][2])
      nombresdeDias.appendChild(agregarNombre)
    }
  }
}
function borrar(entrada) {
  entrada.value=""
}
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

  digA=a%100
  sig=~~(a/100)
  s=1+codM[m]+digA+(~~(digA/4))+codS[sig%4]
  s%=7
  dia=d+codM[m]+digA+(~~(digA/4))+codS[sig%4]
  dia%=7

  if(a%4==0&&m<=2){
    s--
    dia--
    if(s===-1)s=6
    if(dia===-1)dia=6
  }

  dateTitle.innerText=(nameD[dia]+" "+d+" DE "+nameM[m]+" DEL "+a)
  
  filaNombres()

  val=1-s
  cuadricula.innerHTML=""
  while(val<=diasxM[m]){
    for (var i=0; i<7; i++){
      nuevaCasilla=document.createElement("div")
      nuevaCasilla.className="fecha"
      nuevaCasilla.id="num"+val
      ///console.log(nuevaCasilla.onclick);
      if(val<1){
        if(m===1){
          nuevaCasilla.innerText=diasxM[12]+val
        }else{
          nuevaCasilla.innerText=diasxM[m-1]+val
        }
        nuevaCasilla.style.backgroundColor="#dddddd"
      }else if(val>diasxM[m]){
        nuevaCasilla.innerText=val-diasxM[m]
        nuevaCasilla.style.backgroundColor="#dddddd"
      }else{
        nuevaCasilla.innerText=val
        nuevaCasilla.setAttribute("onclick", "pulsarDia("+nuevaCasilla.id+")")
      }
      if(val===d){
        nuevaCasilla.style.backgroundColor="#d0fbbf"
        casillaSeleccionada=nuevaCasilla
      }
      ///nuevaCasilla.onclick="pulsarDia(document.getElementById("+nuevaCasilla.id+"))"
      ///console.log(nuevaCasilla);
      cuadricula.appendChild(nuevaCasilla)
      val++
    }
  }
}