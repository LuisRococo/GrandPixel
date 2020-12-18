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

function test(img, callback){
    Jimp.read(img, (err, image)=>{
        image.pixelate(5),
        image.pixelate(5),
        image.pixelate(5),
        image.pixelate(5)
        image.getBufferAsync(Jimp.AUTO).then((res)=>{
            callback(res);
        });
    });
}

module.exports.pixelear1 = pixelear1;
module.exports.test=test;