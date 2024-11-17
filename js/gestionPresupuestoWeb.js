function mostrarDatoEnID(valor,id){
let idElemento = document.getElementById(id);
if(idElemento)
idElemento.textContent=valor;
}
function mostrarGastoWeb(id, gasto){
let idElemento = document.getElementById(id);
if(idElemento){
let divGasto = document.createElement("div");
divGasto.classList.add("gasto");
let divDescripción = document.createElement("div");
divDescripción.classList.add("gasto-descripcion");
divDescripción.textContent = gasto.descripcion;
divGasto.appendChild(divDescripción);

let divFecha=document.createElement("div");
divFecha.classList.add("gasto-fecha");
divFecha.textContent=gasto.fecha;
divGasto.appendChild(divFecha);

let divValor=document.createElement("div");
divValor.classList.add("gasto-valor");
divValor.textContent = gasto.valor;
divGasto.appendChild(divValor);

let divEtiquetas = document.createElement("div");
divEtiquetas.classList.add("gasto-etiqueta");
gasto.etiquetas.forEach(etiqueta => {
    spanEtiqueta = document.createElement("span");
    spanEtiqueta.classList.add("gasto.etiquetas-etiquetas");
    spanEtiqueta.textContent=etiqueta;
    divEtiquetas.appendChild(spanEtiqueta);
});
divGasto.appendChild(divEtiquetas);

idElemento.appendChild(divGasto);
};
}
function mostrarGastosAgrupadosWeb(id, agrup, periodo){
let idElemento= document.getElementById(id);
let divAgrup = document.createElement("div");
divAgrup.classList.add("agrupacion");

let titulo = document.createElement("h1");
titulo.textContent = 'Gastos agrupados por' + periodo;
divAgrup.appendChild(titulo);

Object.entries(agrup).forEach(([clave, valor])=>{
    let divDato = document.createElement("div");
    divDato.classList.add("agrupacion-dato");

    let spanClave = document.createElement("span");
    spanClave.classList.add=("agrupacion-dato-clave");
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
export{mostrarDatoEnID, mostrarGastoWeb, mostrarGastosAgrupadosWeb};