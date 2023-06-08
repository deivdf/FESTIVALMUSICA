const { src, dest, watch } = require('gulp');
const sass = require("gulp-sass")(require('sass'));
function css(cb){
    src('./src/scss/app.scss')// identificar el archivo de sass
    .pipe( sass () ) // compilar el archivo de sass
    .pipe( dest('build/css'))  // Almacenar el archivo en el disco

    cb(); // callback function que indica que la tarea ha finalizado
}

function dev(cb){
    watch('./src/scss/app.scss', css) // vigilar los cambios en el archivo de sass
    cb();// callback
}
exports.css = css;
exports.dev = dev;