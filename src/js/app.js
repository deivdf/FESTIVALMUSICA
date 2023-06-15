// inicia el codigo en build para produccion como evento de carga del documento en el dom
document.addEventListener('DOMContentLoaded', function() {
    //llamado a la funcion de inicio de la aplicacion
    iniciarApp();
});

//funcion de inicio de la aplicacion
function iniciarApp() {
    //llamado a la funcion de navegacion fija
    navegacionFija();
    //llamado a la funcion de crear galeria
    crearGaleria();
    //llamado a la funcion de scroll en el nav
    scrollNav();
}
//funcion de navegacion fija
function navegacionFija() {
    //selecciona el elemento de la barra de navegacion
    const barra = document.querySelector('.header');
    //registra un evento de scroll
    const sobreFestival = document.querySelector('.sobre-festival');
    //selecciona el body y lo guarda en una variable
    const body = document.querySelector('body');
    //funcion que se ejecuta cuando se hace scroll en cierta posicion de la pagina y fija la barra de navegacion
    window.addEventListener('scroll', function(){
        if(sobreFestival.getBoundingClientRect().bottom < 0){
            //agrega la clase fijo al elemento de la barra de navegacion
            barra.classList.add('fijo');
            //agrega la clase fijar-body al body
            body.classList.add('body-scroll');
        }else{
            //elimina la clase fijo al elemento de la barra de navegacion
            barra.classList.remove('fijo');
            //elimina la clase fijar-body al body
            body.classList.remove('body-scroll');
        }
    });
}
//funcion de scroll en el nav
function scrollNav() {
    //selecciona todos los enlaces del nav
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    //recorre los enlaces y les agrega la funcion de scroll
    enlaces.forEach( enlaces => {
        //registra un evento de click en cada enlace
        enlaces.addEventListener('click', function(e) {
            //elimina el comportamiento por defecto del enlace
            e.preventDefault();
            //selecciona el atributo href del enlace
            const seccionScroll= e.target.attributes.href.value;
            //selecciona la seccion a la que se va a hacer scroll
            const seccion = document.querySelector(seccionScroll);
            // realiza el scroll mas suave y lento
            seccion.scrollIntoView({ behavior: 'smooth' });
        });
    });
}
//funcion de creacion de galeria de imagenes
function crearGaleria() {
    //selecciona el contenedor de las imagenes de la galeria
    const galeria = document.querySelector('.galeria-imgaenes');
    //crea un ciclo para recorrer las imagenes de la galeria
    for(let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        //añade codigo html para la galeria e inserta las imagenes
        imagen.innerHTML = `
        <source srcset="./build/img/thumb/${i}.webp" type="image/webp">
        <source srcset="./build/img/thumb/${i}.avif" type="image/avif">
        <img loading="lazy" src="./build/img/thumb/${i}.jpg" alt="imagen Galeria">`;
        //añade la imagen al contenedor de la galeria
        galeria.appendChild(imagen);
        //agrega la funcion de mostrar imagen al hacer click
        imagen.onclick = function(){
            mostrarImagen(i);
        }
    }
    
}
//funcion de mostrar imagenes en pantalla
function mostrarImagen(id) {
    //crea un nuevo elemento de imagen
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="./build/img/grande/${id}.webp" type="image/webp">
    <source srcset="./build/img/grande/${id}.avif" type="image/avif">
    <img loading="lazy" src="./build/img/grande/${id}.jpg" alt="imagen Galeria">`;
    //crea el overlay para mostrar la imagen
    const overlay = document.createElement('div');
    //añade la imagen al overlay
    overlay.appendChild(imagen);
    //agrega el overlay al html
    overlay.classList.add('overlay');
    //cuando se presiona en cualquier parte, se cierra la imagen
    overlay.onclick = function() {
        //cuando se presiona, se cierra la imagen
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    //boton para cerrar la imagen
    const cerrarImagen = document.createElement('p');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');
    //cuando se presiona, se cierra la imagen
    cerrarImagen.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarImagen);
    //añade el overlay al html
    const body = document.querySelector('body');
    //agrega el overlay al html
    body.appendChild(overlay);
    //agrega la clase para fijar el body
    body.classList.add('fijar-body');
}