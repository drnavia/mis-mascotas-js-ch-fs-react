$(document).ready(function(){
    // Muestro/Oculto el Carrito
    $('#contenedor-carrito').click(function() {
        //$('.div-carrito').toggle("slide");
        $('.producto-carrito').slideToggle("slow");
    });
});