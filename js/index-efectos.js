$(document).ready(function(){
    // Oculto el Carousel
    $("#div-carousel").slideToggle(3000, function () {
        // Muestro nuevamente el Carousel
        $("#div-carousel").fadeIn(2000, function () {
            $("#div-carousel").fadeOut(2000, function () {
                $("#div-carousel").fadeIn(2000);
            })
        });
    });
});