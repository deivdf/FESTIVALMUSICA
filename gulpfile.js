const { src, dest } = require('gulp');
const sass = require("sass")
function css(cb){
    // identificar el archivo de sass
    src('./src/scss/app.scss').pipe( sass () ).pipe( dest('build/css'))
    // compilar el archivo de sass

    // Almacenar el archivo en el disco

    cb(); // callback function que indica que la tarea ha finalizado
}