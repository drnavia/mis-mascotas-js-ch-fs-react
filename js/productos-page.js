// SELECTORES
buscadorFormulario = document.querySelector('#formulario-buscador');
filtrarMarcas = document.querySelector('#marcas-filtrar');

// LISTENERS
buscadorFormulario.addEventListener('submit', cargarProductosBusqueda);
document.addEventListener('DOMContentLoaded', cargarProductosBotonMarcas);
document.addEventListener('DOMContentLoaded', () =>{
    // Llama AJAX para vincular el JSON estático y ejecuta la función que carga el catalogo de productos por pantalla
    $.ajax({
        url: 'json/productos.json',
        data: 'json',
        dataType: 'json',
        success: function(data){
            catalogoProductosRender(data);
        }
    });
});

// CLASE PRODUCTO
class Producto {
    constructor (id, nombre, marca, marcall, img, mascota, tipoprod, peso, precio, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.marcall = marcall;
        this.img = img;
        this.mascota = mascota;
        this.tipoprod = tipoprod;
        this.peso = parseFloat(peso);
        this.precio = Number(precio);
        this.cantidad = parseFloat(cantidad);
    }
    productoSeleccionado() {
        console.log("Producto seleccionado: \n" + this.nombre + " para " + this.mascota + ". El paquete pesa " + this.peso + "kg (" + this.marca + ") -> $ " + this.precio);
    }
    precioConIVA() {
        this.precio = this.precio * 1.21;
        console.log("Producto con IVA: \n" + this.precio);
    }
}

let producto1 = new Producto(3, "Puppy Complete Razas Medianas", "PRO PLAN", "all", "img/productos/pro-plan-puppy-complete-razas-medianas_137.png", "Perro", "Alimento Balanceado", 15, 6000, 90);
producto1.productoSeleccionado();
producto1.precioConIVA();

// ---------
// FUNCIONES
// ---------

// Funcion para vincular el JSON estático y ejecuta la función que filtra por marca
function cargarProductosBotonMarcas(e){
    e.preventDefault();

    $.ajax({
        url:'json/productos.json',
        data: 'json',
        dataType: 'json',
        success: filtrarProductosBotonMarcas
    });
};

// Funcion para filtrar por marca
function filtrarProductosBotonMarcas(result) {   
    filtrarMarcas.addEventListener('click', botonMarca);

    function botonMarca(e){
        e.preventDefault();

        const boton = e.path[0].id;    
        const resultado = result.filter(producto => {
            const prodMarca = producto.marca.toLocaleLowerCase().includes(boton.toLocaleLowerCase());
            const prodTodas = producto.marcall.toLocaleLowerCase().includes(boton.toLocaleLowerCase());
            const productos = prodMarca + prodTodas;
            return productos;
        })
        limpiarCatalogoProductos()
        catalogoProductosRender(resultado);
    }
};

// Funcion para vincular el JSON estático y ejecuta la función que filtra por la busqueda
function cargarProductosBusqueda(e){
    e.preventDefault();

    $.ajax({
        url:'json/productos.json',
        data: 'json',
        dataType: 'json',
        success: filtrarProductosBusqueda
    });
};

// Funcion para filtrar por la busqueda
function filtrarProductosBusqueda(result) {
    const busqueda = $('#buscador').val();

    const resultado = result.filter(producto => {
        const prodNombre = producto.nombre.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase());
        const prodMarca =  producto.marca.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())
        const productos = prodNombre + prodMarca;
        return productos;
    })
    limpiarCatalogoProductos()
    catalogoProductosRender(resultado);
};

// Funcion para mostrar el catalogo de productos en pantalla
function catalogoProductosRender(productos) {
    $('#catalogo-productos').hide(); 
	
    const catalogoProductos = document.querySelector('#catalogo-productos');
    productos.forEach((producto, index) => {
		const { id, nombre, marca, img, mascota, tipoprod, peso, precio } = producto;

		const divProducto = document.createElement('div');
		divProducto.classList.add('box');
		divProducto.innerHTML = `
            <div id="producto-tienda">
                <div class="head">
                    <h4 class="nombre">${nombre}</h4>
                    <img src="${img}" alt="" class="imagen-producto center">
                </div>
                <div class="info">
                    <p>
                        <span class="badge bg-primary marca-producto">${marca}</span>
                        <span class="badge bg-secondary tipoprod">${tipoprod}</span>
                    </p>
                    <p class="tipoprod">${tipoprod}</p>
                    <p>$ <span class="precio">${precio}<span></p>
                </div>
                <div">
                    <a class="bton bton-celeste agregar-producto" href="#" data-id="${id}">Agregar al carrito</a>        
                </div>
            </div>`;
            catalogoProductos.appendChild(divProducto);
    })
    
    $('#catalogo-productos').fadeIn(500);
};

// Funcion para limpiar el catalogo de productos en pantalla
function limpiarCatalogoProductos(){

    while (catalogoProductos.firstChild){
        catalogoProductos.removeChild(catalogoProductos.firstChild);
    }
};