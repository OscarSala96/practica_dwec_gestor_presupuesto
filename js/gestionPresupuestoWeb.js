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

let botonGastoEditar = document.createElement("button");
botonGastoEditar.type="button";
botonGastoEditar.classList="gasto-editar-formulario";
botonGastoEditar.innerText="Editar (formulario)";
let editarHandleFormulario = new EditarHandleFormulario()
botonGastoEditar.addEventListener("click", function(){
    editarHandleFormulario.handleEvent(gasto);
})

divGasto.appendChild(botonEditar);
divGasto.appendChild(botonBorrar);
divGasto.appendChild(botonGastoEditar);
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

function EditarHandleFormulario(){
    this.handleEvent = function(gasto){
        this.gasto=gasto;
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");
        let boton = event.target;
        boton.disabled=true;
        let gastoActual = boton.closest(".gasto");
        gastoActual.append(plantillaFormulario);
        formulario.descripcion.value = this.gasto.descripcion;
        formulario.valor.value= this.gasto.valor;
        formulario.fecha.value=this.gasto.fecha;
        formulario.etiquetas.value = this.gasto.etiquetas;
        function botonEditar(){
            this.handleEvent = function(gasto){
            event.preventDefault();
            this.gasto=gasto;
            this.gasto.actualizarDescripcion(formulario.descripcion.value);
            this.gasto.actualizarValor(parseFloat(formulario.valor.value));
            this.gasto.actualizarFecha(formulario.fecha.value);
            if(formulario.etiquetas.value){
                this.gasto.etiquetas = [];
                this.gasto.anyadirEtiquetas(formulario.etiquetas.value);
                }
            else{
            this.gasto.etiquetas = [];
            }
            repintar();
            }}
            function BorrarFormularioHandle(){
                this.handleEvent = function(formulario){
                    this.formulario = formulario;
                    formulario.remove();
                }}
            let borrarFormularioHandle = new BorrarFormularioHandle();
            let botonCancelar = formulario.querySelector("button.cancelar");
            botonCancelar.addEventListener("click", function(){
               borrarFormularioHandle.handleEvent(formulario);
               boton.disabled=false;
            });
            let botonEnviarHandle = new botonEditar();
            formulario.addEventListener("submit", function(){
                botonEnviarHandle.handleEvent(gasto);
            })
        }
    }
function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
    document.getElementById("anyadirgasto-formulario").disabled = true;
    formulario.addEventListener("submit", function(evento){
        evento.preventDefault();
        let nuevoGasto= new gestionPresupuesto.CrearGasto(
        formulario.descripcion.value,
        parseFloat(formulario.valor.value),
        formulario.fecha.value,
        formulario.etiquetas.value,
        );
        gestionPresupuesto.anyadirGasto(nuevoGasto)
        repintar();
        document.getElementById("anyadirgasto-formulario").disabled = false;
    })
    function BorrarFormularioHandle(){
        this.handleEvent = function(formulario){
            this.formulario = formulario;
            formulario.remove();
            document.getElementById("anyadirgasto-formulario").disabled = false;
        }
    }
    let borrarFormularioHandle = new BorrarFormularioHandle();
    let botonCancelar = formulario.querySelector("button.cancelar");
    botonCancelar.addEventListener("click", function(){
       borrarFormularioHandle.handleEvent(formulario);
    });
    document.getElementById("controlesprincipales").appendChild(plantillaFormulario);
}
function filtrarGastosWeb(evento){
    evento.preventDefault();
    let descripcion = document.getElementById('formulario-filtrado-descripcion').value;
    if(!descripcion)
        descripcion=null;
    let valorMinimo = parseFloat(document.getElementById("formulario-filtrado-valor-minimo").value);
    if(isNaN(valorMinimo))
        valorMinimo=null;
    let valorMaximo = parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);
    if(isNaN(valorMaximo))
        valorMaximo=null;
    let fechaDesde = document.getElementById("formulario-filtrado-fecha-desde").value;
    if(!fechaDesde)
        fechaDesde=null;
    let fechaHasta = document.getElementById("formulario-filtrado-fecha-hasta").value;
    if(!fechaHasta)
        fechaHasta=null;
    let etiquetasTiene = document.getElementById("formulario-filtrado-etiquetas-tiene").value;
    let nuevaEtiquetasTiene = etiquetasTiene ? gestionPresupuesto.transformarListadoEtiquetas(etiquetasTiene) : null;
    
    let datosFiltrados = {
        fechaDesde,
        fechaHasta,
        valorMinimo,
        valorMaximo,
        descripcionContiene: descripcion,
        etiquetasTiene: nuevaEtiquetasTiene
    };
    console.log(datosFiltrados);
    let filtradoGasto = gestionPresupuesto.filtrarGastos(datosFiltrados);
    document.getElementById('listado-gastos-completo').innerHTML="";
    for(let gasto of filtradoGasto){
    mostrarGastoWeb('listado-gastos-completo', gasto);
    }
}
function guardarGastosWeb(evento){
evento.preventDefault();
let gastos=gestionPresupuesto.listarGastos();
let gastosString= JSON.stringify(gastos);
localStorage.setItem("GestorGastosDWEC", gastosString, null);
}
function cargarGastosWeb(evento){
    evento.preventDefault();
    let gastosString = localStorage.getItem("GestorGastosDWEC");
    let gastos=JSON.parse(gastosString);
    gestionPresupuesto.cargarGastos(gastos);
    repintar();
}

document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
document.getElementById("formulario-filtrado").addEventListener("submit", filtrarGastosWeb);
document.getElementById("guardar-gastos").addEventListener("click", guardarGastosWeb);
document.getElementById("cargar-gastos").addEventListener("click", cargarGastosWeb);
export{mostrarDatoEnID, mostrarGastoWeb, mostrarGastosAgrupadosWeb, actualizarPresupuestoWeb};