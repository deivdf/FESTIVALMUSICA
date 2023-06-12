const { src, dest, watch, parallel } = require('gulp');//importa funciones propias de gulp y direciones de carpetas
//apartado css
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");
//cenvertidor de imagenes a webp,e precesamiento de imagen con imagemin y requere cache
const cache = require('gulp-cache') // cache se eencarga de guardar archivos de convercion residual
const imagemin = require('gulp-imagemin')// imagemin hace la conversion con mas calidad de imagenes
const webp = require('gulp-webp');// convierte las imagenes a formato webp
//funcion de integracion de scss a css con gulp
const avif = require('gulp-avif');// convierte las imagenes a formato avif
function css(cb){
    src('./src/scss/**/*.scss')// identificar el archivo de sass
    .pipe(plumber()) // evitar que se detenga la compilacion por errores
    .pipe( sass () ) // compilar el archivo de sass
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
//funcion de ejecución continua de codigo scss a css con gulp
function dev(cb){
    //el **/* es para que escuche todos los archivos dentro de la carpeta y los actualize
    watch('./src/scss/**/*.scss', css) // vigilar los cambios en el archivo de sass
    cb();// callback
}
//exportacion de las funciones como en react
exports.css = css;
exports.imagenes = imagenes;
exports.versionwebp = versionwebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionAvif,versionwebp,dev);//ejecuta las funciones en paralelo con parallel