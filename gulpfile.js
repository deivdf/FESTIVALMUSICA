const { src, dest, watch, parallel } = require('gulp');//importa funciones propias de gulp
//apartado css
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");
//cenvertidor de imagenes a webp,e precesamiento de imagen con imagemin y requere cache
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp');
//funcion de integracion de scss a css con gulp
function css(cb){
    src('./src/scss/**/*.scss')// identificar el archivo de sass
    .pipe(plumber())
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
    .pipe( cache(imagemin()) ) // compilar el archivo de sass
    .pipe( dest('build/img'))
    cb(); // callback function que
}
function versionwebp(cb){
    const opciones = {
        quality: 50
    };
    src('./src/img/**/*.{png,jpg}')//se encarga de buscar todas las imagines en {png,jpg}estos formatos
    .pipe( webp( opciones) ) // compilar el archivo de sass
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
exports.dev = parallel(imagenes,versionwebp,dev);//ejecuta las funciones en paralelo con parallel