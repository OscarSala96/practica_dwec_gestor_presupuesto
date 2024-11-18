import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';
gestionPresupuesto.actualizarPresupuesto(1500);
gestionPresupuestoWeb.mostrarDatoEnID("presupuesto", gestionPresupuesto.mostrarPresupuesto());

const gastos = [
    new gestionPresupuesto.CrearGasto("Comprar carne", 23.44, "2021-10-06", "casa", "comida"),
    new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"),
    new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"),
    new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"),
    new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"),
    new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"),
]
gastos.forEach(gasto => gestionPresupuesto.anyadirGasto(gasto));
let totalGastos = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnID("gastos-totales", totalGastos);

let balanceTotal= gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnID("balance-total", balanceTotal);

let listadoCompleto = gestionPresupuesto.listarGastos();
listadoCompleto.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
});
let gastosSeptiembre2021 = gestionPresupuesto.filtrarGastos({fechaDesde:"2021-09-01", fechaHasta:"2021-09-30"});
gastosSeptiembre2021.forEach(gasto => {

    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
});
let gastosMas50 = gestionPresupuesto.filtrarGastos({valorMinimo:50});
gastosMas50.forEach(gasto =>{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
});
let segurosMas200 = gestionPresupuesto.filtrarGastos({valorMinimo:200, etiquetas:['seguros']});
segurosMas200.forEach(gasto =>{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
});
let gastosComidaTransporte = gestionPresupuesto.filtrarGastos({
    etiquetas:["comida","transporte"],
    valorMaximo:50
});
gastosComidaTransporte.forEach(gasto=>{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
});
let gastosAgrupadosDia = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgrupadosDia, "día");
let gastosAgrupadosMes = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosAgrupadosMes, "mes");
let gastosAgrupadosAnyo = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAgrupadosAnyo, "año");
