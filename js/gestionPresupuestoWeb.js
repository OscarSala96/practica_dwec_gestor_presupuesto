import * as gestionPresupuesto from './gestionPresupuesto.js';
function mostrarDatoEnID(id, valor){
let idElemento = document.getElementById(id);
idElemento.textContent=valor;
}
function mostrarGastoWeb(id, gasto){
let idElemento = document.getElementById(id);
let divGasto = document.createElement("div");
divGasto.classList.add("gasto");
let divDescripción = document.createElement("div");
divDescripción.classList.add("gasto-descripcion");
divDescripción.textContent = gasto.descripcion;
divGasto.appendChild(divDescripción);

let divValor=document.createElement("div");
divValor.classList.add("gasto-valor");
divValor.textContent = gasto.valor;
divGasto.appendChild(divValor);

let divFecha=document.createElement("div");
divFecha.classList.add("gasto-fecha");
divFecha.textContent= new Date (gasto.fecha).toLocaleDateString();
divGasto.appendChild(divFecha);

let divEtiquetas = document.createElement("div");
divEtiquetas.classList.add("gasto-etiquetas");
for(let etiqueta of gasto.etiquetas) {
    let spanEtiqueta = document.createElement("span");
    spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
    spanEtiqueta.textContent=etiqueta + ', ';
    divEtiquetas.appendChild(spanEtiqueta);
    let borrarEtiquetas = new BorrarEtiquetasHandle();
    spanEtiqueta.addEventListener("click", function(){
        borrarEtiquetas.handleEvent(gasto, etiqueta);
    })
};
divGasto.appendChild(divEtiquetas);

let botonEditar = document.createElement("button");
botonEditar.type="button";
botonEditar.classList.add("gasto-editar");
botonEditar.innerText = "Editar";
let editarHandle = new EditarHandle();
botonEditar.addEventListener("click", function(){
    editarHandle.handleEvent(gasto);
});

let botonBorrar = document.createElement("button");
botonBorrar.type="button";
botonBorrar.classList.add("gasto-borrar");
botonBorrar.innerText="Borrar";
let borrarHandle = new BorrarHandle();
botonBorrar.addEventListener("click", function(){
    borrarHandle.handleEvent(gasto);
});


divGasto.appendChild(botonEditar);
divGasto.appendChild(botonBorrar);
idElemento.appendChild(divGasto);
}
function mostrarGastosAgrupadosWeb(id, agrup, periodo){
let idElemento= document.getElementById(id);
let divAgrup = document.createElement("div");
divAgrup.classList.add("agrupacion");

let titulo = document.createElement("h1");
titulo.textContent = 'Gastos agrupados por ' + periodo;
divAgrup.appendChild(titulo);

Object.entries(agrup).forEach(([clave, valor])=>{
    let divDato = document.createElement("div");
    divDato.classList.add("agrupacion-dato");

    let spanClave = document.createElement("span");
    spanClave.classList.add("agrupacion-dato-clave");
    spanClave.textContent= clave;

    let spanValor = document.createElement("span");
    spanValor.classList.add("agrupacion-dato-valor");
    spanValor.textContent= valor;
    divDato.appendChild(spanClave);
    divDato.appendChild(spanValor);
    divAgrup.appendChild(divDato);
});
idElemento.appendChild(divAgrup);
}
function repintar(){
    mostrarDatoEnID('presupuesto',gestionPresupuesto.mostrarPresupuesto());
    let totalGastos=gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnID("gastos-totales", totalGastos);
    let balance = gestionPresupuesto.calcularBalance();
    mostrarDatoEnID("balance-total" , balance);
    let listadoGastos= document.getElementById("listado-gastos-completo");
    listadoGastos.innerHTML="";
    let listaGastos = gestionPresupuesto.listarGastos();
    for(let gasto of listaGastos){
        mostrarGastoWeb("listado-gastos-completo", gasto);
    };
}
function actualizarPresupuestoWeb(){
    let presupuestoUsuario = prompt("Introduce el nuevo presupuesto");
    let presupuestoNumero = parseFloat(presupuestoUsuario);
    gestionPresupuesto.actualizarPresupuesto(presupuestoNumero);
    repintar();
}
let boton = document.getElementById("actualizarpresupuesto");
boton.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let descripcionPrompt = prompt("Descripción");
    let valorPrompt = parseInt(prompt("Valor"));
    let fechaPrompt = (prompt("Fecha"));
    let etiquetasPrompt = prompt("Etiquetas");
    let etiquetasArr = etiquetasPrompt.split(',');
    let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcionPrompt, valorPrompt, fechaPrompt, ...etiquetasArr);
    gestionPresupuesto.anyadirGasto(nuevoGasto);
    repintar();
}
let botonGasto = document.getElementById("anyadirgasto");
botonGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle () {
    this.handleEvent = function(gasto) {
        this.gasto = gasto;
        let descripcionPrompt = prompt("Descripción", this.gasto.descripcion);
        let valorPrompt = parseFloat(prompt("Valor", this.gasto.valor));
        let fechaPrompt = (prompt("Fecha"));
        let etiquetasPrompt = prompt("Etiquetas", this.gasto.etiquetas);
        let etiquetasArr = etiquetasPrompt.split(',');
        this.gasto.actualizarDescripcion(descripcionPrompt);
        this.gasto.actualizarValor(valorPrompt);
        this.gasto.actualizarFecha(fechaPrompt);
        this.gasto.anyadirEtiquetas(etiquetasArr);
        repintar();
    }
}
function BorrarHandle(){
    this.handleEvent = function(gasto){
        this.gasto=gasto;
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();    
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent= function(gasto, etiqueta){
        this.gasto = gasto;
        this.etiqueta = etiqueta;
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();

    }
}
export{mostrarDatoEnID, mostrarGastoWeb, mostrarGastosAgrupadosWeb, actualizarPresupuestoWeb};