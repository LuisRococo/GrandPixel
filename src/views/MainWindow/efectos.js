const Jimp = require("jimp");

function pixelear1(img, valor, callback) {
    Jimp.read(img, (err, lenna) => {
        if (err) {
            console.log(err);
        } else {
            lenna
                .pixelate(valor)
                .getBufferAsync(Jimp.AUTO).then((res)=>{
                    callback(res);
                });
        }
    });
}

module.exports.pixelear1 = pixelear1;