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

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

this.valor = (valor >=0) ? valor : 0;
this.descripcion = descripcion;
this.etiquetas= etiquetas.length > 0 ? etiquetas:[];
this.fecha = isNaN(Date.parse(fecha)) ? Date.now() : Date.parse(fecha);

    this.actualizarDescripcion = function(desc){
        this.descripcion = desc;
    }
    this.actualizarValor = function(valor){
        this.valor = (valor >=0) ? valor : this.valor;
    }
    this.mostrarGasto=function(){
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    }
    this.anyadirEtiquetas = function(...nuevasEtiquetas){
        for(let i=0; i<nuevasEtiquetas.length; i++){
            if(!this.etiquetas.includes(nuevasEtiquetas[i])){
                this.etiquetas.push(nuevasEtiquetas[i]);
            }
        }
    }
    this.mostrarGastoCompleto = function(){
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.\n" +
        "Fecha: " + new Date(this.fecha).toLocaleString() +
        "\nEtiquetas:\n" + "- " + this.etiquetas.join("\n- ");
    }
    this.actualizarFecha = function(fecha){
        this.fecha = isNaN(Date.parse(fecha)) ? this.fecha : Date.parse(fecha);
    }
    this.borrarEtiquetas = function(...borrarEtiquetas){
        for(let i=0; i<borrarEtiquetas.length;i++){
            for(let j=0; j<this.etiquetas.length;j++){
                if(this.etiquetas[j]==borrarEtiquetas[i]){
                    this.etiquetas.splice(j,1);
                    j--
                }
            }

            }
        }
}
function listarGastos(){
    return gastos;
}
function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);

}
function borrarGasto(id){
    for(let i=0;i<gastos.length;i++){
        if(gastos[i].id == id){
        gastos.splice(i,1);
        }
    }
}
function calcularTotalGastos(){
let sumaGastos = 0;
for(let i=0;i<gastos.length;i++){
    sumaGastos+= gastos[i].valor;
}
return sumaGastos;
}
function calcularBalance(){
let balance = presupuesto - calcularTotalGastos();
return balance;
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
