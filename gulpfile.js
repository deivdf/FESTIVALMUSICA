const { src, dest, watch, parallel } = require('gulp');//importa funciones propias de gulp y direciones de carpetas
//apartado css
const sass = require("gulp-sass")(require('sass'));//importa la funcion de sass y la ejecuta con gulp
const plumber = require("gulp-plumber");//evita que se detenga la compilacion por errores
const autoprefixer = require("autoprefixer");//agrega prefijos a las propiedades de css para que sea compatible con todos los navegadores
const cssnano = require("cssnano");//minifica el codigo css para que sea mas ligero y rapido de cargar en el navegador web
const postcss = require("gulp-postcss");//permite la integracion de autoprefixer y cssnano con gulp y sass
const sourcemaps = require("gulp-sourcemaps");//permite ver el codigo original de sass en el navegador web para poder debugear el codigo css en el navegador web
//cenvertidor de imagenes a webp,e precesamiento de imagen con imagemin y requere cache
const cache = require('gulp-cache') // cache se eencarga de guardar archivos de convercion residual
const imagemin = require('gulp-imagemin')// imagemin hace la conversion con mas calidad de imagenes
const webp = require('gulp-webp');// convierte las imagenes a formato webp
//javascript
const terser = require('gulp-terser-js');//minifica el codigo javascript para que sea mas ligero y rapido de cargar en el navegador web
//funcion de integracion de scss a css con gulp
const avif = require('gulp-avif');// convierte las imagenes a formato avif
function css(cb){
    src('./src/scss/**/*.scss')// identificar el archivo de sass
    .pipe( sourcemaps.init() ) // iniciar el procesamiento de sourcemaps (para ver el codigo original de sass en el navegador web)
    .pipe(plumber()) // evitar que se detenga la compilacion por errores
    .pipe( sass () ) // compilar el archivo de sass
    .pipe( postcss([ autoprefixer(), cssnano() ]) ) // agregar prefijos y minificar el css
    .pipe( sourcemaps.write('.') ) // escribir los sourcemaps en el mismo directorio que el archivo css compilado (./css)
    .pipe( dest('build/css'))  // Almacenar el archivo en el disco

    cb(); // callback function que indica que la tarea ha finalizado
}
//funcion de conversion de imagenes con gulp, imagemin aligerara optimizanodo las imagenes
function imagenes(cb){
    const opciones ={
        optimizacionLevel:3
    }
    src('./src/img/**/*.{png,jpg}')//se encarga de buscar todas las imagines en {png,jpg}estos formatos
    .pipe( cache(imagemin()) ) // compilar el archivo de sass cache se eencarga de guardar archivos de convercion residual
    .pipe( dest('build/img'))
    cb(); // callback function que
}
//funcion que convierte imagenes a formato webp
function versionwebp(cb){
    const opciones = {
        quality: 50
    };
    src('./src/img/**/*.{png,jpg}')//se encarga de buscar todas las imagines en {png,jpg}estos formatos
    .pipe( webp( opciones) ) // compilar el archivo de sass
    .pipe( dest('build/img'))  // Almacenar el archivo en el disco
    cb(); // callback function que
}
//funcion que convierte inamgenes a formato avif
function versionAvif(cb){
    const opciones = {
        quality: 50
    };
    src('./src/img/**/*.{png,jpg}')//se encarga de buscar todas las imagines en {png,jpg}estos formatos
    .pipe( avif( opciones) ) // compilar el archivo de sass
    .pipe( dest('build/img'))  // Almacenar el archivo en el disco
    cb(); // callback function que
}
//funcion de ejecución continua de codigo javascript con gulp
function javascript(cb){
    src('./src/js/**/*.js')//se encarga de buscar todas las imagines en {png,jpg}estos formatos
    .pipe( sourcemaps.init() ) // iniciar el procesamiento de sourcemaps (para ver el codigo original de javascript en el navegador web)
    .pipe(terser())//minifica el codigo javascript para que sea mas ligero y rapido de cargar en el navegador web
    .pipe( sourcemaps.write('.') ) // escribir los sourcemaps en el mismo directorio que el archivo jd compilado (./j)
    .pipe( dest('build/js'))  // Almacenar el archivo en el disco
    cb(); // callback function que indica que la tarea ha finalizado
}
//funcion de ejecución continua de codigo scss a css con gulp
function dev(cb){
    //el **/* es para que escuche todos los archivos dentro de la carpeta y los actualize
    watch('./src/scss/**/*.scss', css) // vigilar los cambios en el archivo de sass
    watch('./src/js/**/*.js', javascript) // vigilar los cambios en el archivo de Javascript
    cb();// callback
}
//exportacion de las funciones como en react
exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionwebp = versionwebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionAvif,versionwebp, javascript,dev);//ejecuta las funciones en paralelo con parallel