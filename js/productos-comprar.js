// SELECTORES
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito');
const listaProductos = document.querySelector('#catalogo-productos');

// ARRAY DE PRODUCTOS EN EL CARRITO
let carritoProductos = [];

// LISTENERS
listaProductos.addEventListener('click', agregarProducto);

// Recuperar la información del localStorage
document.addEventListener('DOMContentLoaded', () => {
    carritoProductos = JSON.parse(localStorage.getItem('carrito')) || [];
    cantidadProdsCarrito();
})

// ---------
// FUNCIONES
// ---------

// Funcion para agregar productos al carrito
function agregarProducto(e){
    e.preventDefault();
    
    console.log(e.target.classList.contains('agregar-producto')); 
    if(e.target.classList.contains('agregar-producto')){
        //const productoSeleccionado = e.target.parentElement.parentElement;
        const productoSeleccionado = e.target.parentElement.parentElement;
        console.log(e.target.parentElement.parentElement);
        obtenerDatos(productoSeleccionado);
        cantidadProdsCarrito();
    }

}

// Funcion para obtener los datos para agregar el producto
function obtenerDatos(producto){
    const productoAgregado = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('.nombre').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    console.log(producto.querySelector('a').getAttribute('data-id'));
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

};

// Funcion para guardar el producto agregado en el localstorage
function guardarStorage(){
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
};

// Funcion para limpiar el contenedor del carrito
function limpiarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
};

// Funcion para saber la cantidad de productos en el carrito
function cantidadProdsCarrito(){
    const cantidadDeProductos = document.querySelector("#cantidad-prods-carrito");
    const agregarCantidad = document.querySelector('.cantidad');
    agregarCantidad.innerHTML = '';
    agregarCantidad.innerHTML = `${carritoProductos.length}`;
    cantidadDeProductos.appendChild(agregarCantidad);
};