const fs = require('fs');
const { isNullOrUndefined } = require('util');

function leerImagen(ruta) {
  try {
    const imagen = fs.readFileSync(ruta);
    return imagen;
  } catch (err) {
    console.error(err)
    return null;
  }
}

function guardarImagen(ruta, buff) {
  try {
    fs.writeFileSync(ruta, buff);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

/*fs.writeFile('logo.png', imagedata, 'binary', function(err){
            if (err) throw err
            console.log('File saved.')
        })
*/

module.exports.leerImagen = leerImagen;
module.exports.guardarImagen=guardarImagen;

