let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(numero) {
    if(numero>=0){
        presupuesto = numero;
        return numero;
    }
    else{
        return -1;
    }
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, valor, fecha, etiquetas) {

this.valor = (valor >=0) ? valor : 0;
this.descripcion = descripcion;
    this.actualizarDescripcion = function(desc){
        this.descripcion = desc;
    }
    this.actualizarValor = function(valor){
        this.valor = (valor >=0) ? valor : this.valor;
    }
    this.mostrarGasto=function(){
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    }

}
function listarGastos(){
return gastos;
}
function anyadirGasto(){

}
function borrarGasto(){

}
function calcularTotalGastos(){

}
function calcularBalance(){

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
