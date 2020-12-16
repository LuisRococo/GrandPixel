const Jimp = require("jimp");

function pixelear(img, valor, callback) {
    Jimp.read(img, (err, lenna) => {
        if (err) {
            console.log(err);
        } else {
            lenna
                .resize(1000, 1000) // resize
                .quality(60) // set JPEG quality
                .greyscale() // set greyscale
                .getBufferAsync(Jimp.AUTO).then((res)=>{
                    callback(res);
                });
        }
    });
}

module.exports.pixelear = pixelear;