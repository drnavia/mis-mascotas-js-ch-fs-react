// SELECTORES
const contenedorCarrito = document.querySelector('#contenedor-carrito');
const contenedorVaciarCarrito = document.querySelector('#vaciar-boton-carrito');
const contenedorComprarCarrito = document.querySelector('#comprar-boton-carrito');
const contenedorPagoCarrito = document.querySelector('#pago-carrito');

// LISTENERS
contenedorCarrito.addEventListener('click', aumentarProducto);
contenedorCarrito.addEventListener('click', disminuirProducto);
contenedorCarrito.addEventListener('click', quitarProducto);
contenedorVaciarCarrito.addEventListener('click', vaciarCarrito);
contenedorComprarCarrito.addEventListener('click', agregarEnvioRender);
contenedorPagoCarrito.addEventListener('click', agregarPagoRender);
contenedorPagoCarrito.addEventListener('click', agregarPagoFinalRender);

// Recuperar la información del localStorage
document.addEventListener('DOMContentLoaded', () => {
    carritoProductos = JSON.parse(localStorage.getItem('carrito')) || [];
    if(carritoProductos == 0){
        limpiarCarrito();
        cantidadProdsCarrito();
        agregarCarritoVacioRender();
        limpiarVaciarCarrito();
        limpiarComprarCarrito();
    } else{
        $('#contenedor-carrito').hide()
        limpiarComprarCarrito();
        limpiarVaciarCarrito();
        agregarComprarRender();
        agregarVaciarRender();
        agregarCarritoRender();
        cantidadProdsCarrito();
        $('#contenedor-carrito').fadeIn('1000')
    }
});

// ---------
// FUNCIONES
// ---------

// Funcion para vaciar el carrito
function vaciarCarrito(e){
    if (e.target.classList.contains('boton-vaciar-carrito')) {
        $('#contenedor-carrito').hide()
        e.preventDefault();
        limpiarCarrito();
        carritoProductos = [];
        cantidadProdsCarrito();
        agregarCarritoVacioRender();
        guardarStorage();
        limpiarComprarCarrito();
        limpiarVaciarCarrito();
        $('#contenedor-carrito').fadeIn('1000')
    }
};

// Funcion para quitar productos del carrito
function quitarProducto(e){
    if(e.target.classList.contains('borrar-producto')){
        e.preventDefault();
        const productoide = e.target.getAttribute('data-id');
        carritoProductos = carritoProductos.filter( producto => producto.id != productoide);
        agregarCarritoRender();
        cantidadProdsCarrito();
        guardarStorage();
        
        if(carritoProductos == 0){
            $('#contenedor-carrito').hide()
            agregarCarritoVacioRender();
            limpiarComprarCarrito();
            limpiarVaciarCarrito();
            guardarStorage();
            $('#contenedor-carrito').fadeIn('1000')
        }
    }
};

// Funcion para aumentar la cantidad de un producto
function aumentarProducto(e){
    if (e.target.classList.contains('aumentar-producto')) {
        const id = e.target.getAttribute('data-id');
        const producto = e.target.parentElement;
        const productosCantidad = producto.querySelectorAll('.cantidad-productos');
        let cantidad = productosCantidad.length;

        carritoProductos.map(producto => {
            if (producto.id == id && producto.cantidad < 25){
                producto.cantidad++;
            }})
            guardarStorage()
            agregarCarritoRender()
    }
};

// Funcion para disminuir la cantidad de un producto
function disminuirProducto(e){
    if (e.target.classList.contains('disminuir-producto')) {
        const id = e.target.getAttribute('data-id');
        const producto = e.target.parentElement;
        const productosCantidad = producto.querySelectorAll('.cantidad-productos');
        let cantidad = productosCantidad.length;

        carritoProductos.map(producto => {
            if (producto.id == id && producto.cantidad > 1){
                producto.cantidad--;
            }})
            guardarStorage()
            agregarCarritoRender()
    }
};

// Funcion para mostrar en el carrito el producto agregado
function agregarCarritoRender(){
    limpiarCarrito();
    const total = document.querySelector('.precio-total');
    let sumaPrecios = 0;

    carritoProductos.forEach(producto => {
        const {nombre, imagen, precio, cantidad, id} = producto;
        sumaPrecios += Number(precio*cantidad);

        const row = document.createElement('div');
        row.classList.add('d-flex', 'row', 'justify-content-center', 'producto-carrito')
        row.innerHTML = `
            <div class="d-flex row align-items-center">
                <div class="d-flex justify-content-center col-2">
                    <img src="${imagen}" alt="${nombre}" class="imagen-carrito" width="50">
                </div>
                <div class="d-flex justify-content-left col-4">
                    <h5>${nombre}</h5>
                </div>
                <div class="d-flex justify-content-center col-2">
                    <p>
                        <span class="badge rounded-pill bg-danger disminuir-producto" data-id="${id}">-</span> 
                        <span class="cantidad-producto">${cantidad}</span> 
                        <span class="badge rounded-pill bg-success aumentar-producto" data-id="${id}">+</span>
                    </p>
                </div>
                <div class="d-flex justify-content-center col-2">
                    <p>$ <span class="precio-carrito">${precio*cantidad}</span></p>
                </div>
                <div class="d-flex justify-content-center col-1">
                    <button type="button" class="btn btn-danger borrar-producto" data-id="${id}">x</button>
                </div>
            </div>`;
        total.setAttribute('data-target', sumaPrecios);
        contenedorCarrito.appendChild(row);
    })

    function actualizarTotal() {
        const counters = document.querySelectorAll('.precio-total');
        const speed = 0;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;
                
                if (count < target) {
                    counter.innerText = count + inc;
                    setTimeout(updateCount, 1);
                }
                else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }
    actualizarTotal()
};

// Funcion para limpiar el carrito
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

// Funcion para guardar el producto agregado en el localstorage
function guardarStorage(){
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
};

// Funcion para mostrar el carrito vacio
function agregarCarritoVacioRender(){
    const row = document.createElement('div');
    row.classList.add('d-flex', 'row', 'justify-content-center')
    row.innerHTML = `
        <div class="d-flex row container-fluid justify-content-center">
            <div class="row d-flex justify-content-center">
                <div class="d-flex justify-content-center col-12">
                    <p class="carrito-vacio-texto">No tienes artículos en tu Carrito</p>
                </div>
                <div class="d-flex justify-content-center col-12">
                    <a class="bton bton-celeste boton-carrito-vacio" href="productos.html">Volver a productos</a>
                </div>
            </div>
        </div>`;
    contenedorCarrito.appendChild(row);
};

// Funcion para mostrar el total y el botón de comprar
function agregarComprarRender(){
    const row = document.createElement('div');
    row.classList.add('d-flex', 'justify-content-center');
    row.innerHTML = `
        <div class="container justify-content-center">
            <div class="d-flex justify-content-center">
                <div class="d-flex row justify-content-center">
                    <div class="justify-content-center d-flex precio-total-div">
                        <p>Total: $ <span class="precio-total" data-target=""></span></p>
                    </div>
                    <div class="d-flex row justify-content-center boton-comprar">
                        <a href="#" class="bton bton-celeste envio-carrito" id="comprar-carrito">Comprar</a>
                    </div>
                </div>
            </div>
        </div>`;
    contenedorComprarCarrito.appendChild(row);
};

// Funcion para limpiar el contenedor del carrito
function limpiarComprarCarrito(){
    while(contenedorComprarCarrito.firstChild){
        contenedorComprarCarrito.removeChild(contenedorComprarCarrito.firstChild);
    }
};

// Funcion para mostrar los botones de vaciar carrito y de volver a productos
function agregarVaciarRender(){
    const row = document.createElement('div');
    row.classList.add('d-flex', 'justify-content-center');
    row.innerHTML = `
        <div class="container justify-content-center">
            <div class="d-flex align-items-center justify-content-center">
                <div class="d-flex col justify-content-center">
                    <a href="#" class="bton bton-rojo boton-vaciar-carrito">Vaciar carrito</a>
                    <a href="productos.html" class="bton bton-celeste boton-carrito-vacio">Volver a productos</a>
                </div>
            </div>
        </div>`;
    contenedorVaciarCarrito.appendChild(row);
};

// Funcion para limpiar el contenedor del carrito vacio
function limpiarVaciarCarrito(){
    while(contenedorVaciarCarrito.firstChild){
        contenedorVaciarCarrito.removeChild(contenedorVaciarCarrito.firstChild);
    }
};

// Funcion para mostrar el formulario de datos para el envio
function agregarEnvioRender(e){
    if(e.target.classList.contains('envio-carrito')){
        limpiarCarrito()
        limpiarVaciarCarrito()
        limpiarComprarCarrito()
        const row = document.createElement('div');
        row.classList.add('d-flex', 'row', 'justify-content-center');
        row.innerHTML = `
            <div class="fondo-envio">
                <p class="titulo-envio">Datos para el envio</p>
                <div class="d-flex row container-fluid">
                    <div class="col-6 formulario envio-form">
                        <label for="nombre" class="form-label"></label>
                        <input type="text" class="form-control" minlength="0" maxlength="10" placeholder="Nombre">
                    </div>
                    <div class="col-6">
                        <label for="apellido" class="form-label"></label>
                        <input type="text" class="form-control" minlength="0" maxlength="10" placeholder="Apellido">
                    </div>
                    <div class="col-6">
                        <label for="direccion" class="form-label"></label>
                        <input type="text" class="form-control" minlength="0" maxlength="18" placeholder="Direccion">
                    </div>
                    <div class="col-3">
                        <label for="depto" class="form-label"></label>
                        <input type="number" class="form-control number-arrow" min="0" max="99" minlength="0" maxlength="2" placeholder="Depto">
                    </div>
                    <div class="col-3">
                        <label for="codigopostal" class="form-label"></label>
                        <input type="number" class="form-control number-arro" min="0" max="9999" minlength="0" maxlength="4" placeholder="Codigo Postal">
                    </div>
                    <div class="col-6">
                        <label for="email" class="form-label"></label>
                        <input type="email" class="form-control" minlength="0" maxlength="28" placeholder="Correo">
                    </div>
                    <div class="col-6">
                        <label for="phone" class="form-label"></label>
                        <input type="tel" class="form-control" pattern="[0-9]{2}-[0-9]{4}-[0-9]{4}" minlength="0" maxlength="10" placeholder="Telefono">
                    </div>
                    <div class="col-12 text-center boton-envio">
                        <button type="submit" class="bton bton-celeste boton-enviar pago-carrito">Siguiente</button>
                    </div>
                </div>
            </div>`;
        contenedorPagoCarrito.appendChild(row);
    }
};

// Funcion para limpiar el contenedor de pago
function limpiarPagoCarrito(){
    while(contenedorPagoCarrito.firstChild){
        contenedorPagoCarrito.removeChild(contenedorPagoCarrito.firstChild);
    }
};

// Funcion para mostrar el formulario de pago
function agregarPagoRender(e){
    if(e.target.classList.contains('pago-carrito')){
        limpiarPagoCarrito()
        limpiarCarrito()
        limpiarVaciarCarrito()
        limpiarComprarCarrito()
        const row = document.createElement('div');
        row.classList.add('d-flex', 'row', 'justify-content-center');
        row.innerHTML = `
            <div class="fondo-pago">
                <p class="titulo-pago">Datos de pago</p>
                <div class="d-flex row container-fluid">
                    <div class="col-4">
                        <label for="nombre" class="form-label"></label>
                        <input type="text" class="form-control" minlength="0" maxlength="10" placeholder="Nombre y Apellido">
                    </div>
                    <div class="col-5">
                        <label for="numbertarjet" class="form-label"></label>
                        <input type="number" class="form-control" min="0" max="9999999999" placeholder="Numero de tarjeta">
                    </div>
                    
                    <div class="col-4">
                        <label for="documento" class="form-label"></label>
                        <input type="number" class="form-control number-arro" min="0" max="99999999" minlength="0" maxlength="8" placeholder="DNI">
                    </div>
                    <div class="col-3">
                        <label for="fechaCad" class="form-label"></label>
                        <input type="month" class="form-control" min="2021-01" max="2035-12" placeholder="Fecha de caducidad">
                    </div>
                    <div class="col-2">
                        <label for="cvv" class="form-label"></label>
                        <input type="number" class="form-control" min="0" max="999" placeholder="CVV">
                    </div>
                    
                    <div class="col-12 text-center">
                        <button type="submit" class="bton bton-celeste boton-enviar pago">Pagar</button>
                    </div>
                </div>
            </div>`;
        contenedorPagoCarrito.appendChild(row);
    }
};

// Funcion para mostrar agradecimiento por la compra
function agregarPagoFinalRender(e){
    if(e.target.classList.contains('pago')){
        limpiarPagoCarrito()
        limpiarCarrito()
        limpiarVaciarCarrito()
        limpiarComprarCarrito()
        carritoProductos = [];
        cantidadProdsCarrito();
        guardarStorage();
        limpiarComprarCarrito();
        limpiarVaciarCarrito();
        const row = document.createElement('div');
        row.classList.add('d-flex', 'justify-content-center');
        row.innerHTML = `
            <div class="d-flex row justify-content-center">
                <div class="fondo-compra-finalizada">
                <p class="titulo-gracias">¡Gracias por tu compra!</p>
                <div class="row justify-content-center d-flex">
                    <div class="col-12 text-center">
                        <a class="bton bton-celeste boton-carrito-vacio" href="productos.html">Volver a productos</a>
                    </div>
                    </div>
                </div>
            </div>`;
        contenedorPagoCarrito.appendChild(row);
    }
};