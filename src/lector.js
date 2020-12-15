const fs = require('fs')

function leerImagen (ruta){
    try {
        const imagen = fs.readFileSync(ruta);
        return imagen;
      } catch (err) {
        console.error(err)
        return null;
      }
}

/*fs.writeFile('logo.png', imagedata, 'binary', function(err){
            if (err) throw err
            console.log('File saved.')
        })
*/

module.exports.leerImagen=leerImagen;

