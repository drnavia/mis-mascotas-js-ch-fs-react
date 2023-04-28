// SELECTORES
const listaProductos = document.querySelector('#lista-productos');

// ARRAY DE PRODUCTOS EN EL CARRITO
let carritoProductos = [];

// LISTENERS
listaProductos.addEventListener('click', agregarProducto);

// Recuperar la información del localStorage
document.addEventListener('DOMContentLoaded', () => {
    carritoProductos = JSON.parse(localStorage.getItem('carrito')) || [];
    cantidadProdsCarrito();
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
        console.log("Producto seleccionado: \n" + this.nombre + " para " + this.mascota + ". El paquete pesa " + this.peso + "kg (" + this.marca + ")");
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

// Funcion para agregar productos al carrito
function agregarProducto(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-producto')){
        const productoSeleccionado = e.target.parentElement.parentElement;
        obtenerDatos(productoSeleccionado);
        cantidadProdsCarrito();
    }

}

// Funcion para obtener los datos para agregar el producto
function obtenerDatos(producto){
    const productoAgregado = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('.prod-nombre').textContent,
        precio: producto.querySelector('.prod-precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    const existe = carritoProductos.some( producto => {
        return producto.id == productoAgregado.id;
    });

    if(existe){
        const productos = carritoProductos.map(producto => {
            if(producto.id === productoAgregado.id){
                producto.cantidad++; 
                return producto;
            } else{
                return producto;
            }
        })
        carritoProductos = [...productos];
    } else{
        carritoProductos.push(productoAgregado);
    }

    guardarStorage();

}

// Funcion para guardar el producto agregado en el localstorage
function guardarStorage(){
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
}

// Funcion para limpiar el contenedor del carrito
function limpiarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

// Funcion para saber la cantidad de productos en el carrito
function cantidadProdsCarrito(){
    const cantidadDeProductos = document.querySelector("#cantidad-prods-carrito");
    const agregarCantidad = document.querySelector('.cantidad');
    agregarCantidad.innerHTML = '';
    agregarCantidad.innerHTML = `${carritoProductos.length}`;
    cantidadDeProductos.appendChild(agregarCantidad);
}