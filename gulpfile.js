const { src, dest, watch } = require('gulp');
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");
function css(cb){
    src('./src/scss/**/*.scss')// identificar el archivo de sass
    .pipe(plumber())
    .pipe( sass () ) // compilar el archivo de sass
    .pipe( dest('build/css'))  // Almacenar el archivo en el disco

    cb(); // callback function que indica que la tarea ha finalizado
}

function dev(cb){
    //el **/* es para que escuche todos los archivos dentro de la carpeta y los actualize
    watch('./src/scss/**/*.scss', css) // vigilar los cambios en el archivo de sass
    cb();// callback
}
exports.css = css;
exports.dev = dev;