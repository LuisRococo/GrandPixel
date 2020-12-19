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

function dither (img, callback){
    Jimp.read(img, (err, newImg)=>{
        if (err){
            console.log(err);
        } else {
            newImg.dither565()
            .getBufferAsync(Jimp.AUTO).then((res)=>{
                callback(res);
            })
        }
    });
}

function brightness(img, valor, callback) {
    Jimp.read(img, (err, imgNew) => {
        if (err) {
            console.log(err);
        } else {
            imgNew
                .brightness(valor)
                .getBufferAsync(Jimp.AUTO).then((res)=>{
                    callback(res);
                });
        }
    });
}

function contrast(img, valor, callback) {
    Jimp.read(img, (err, imgNew) => {
        if (err) {
            console.log(err);
        } else {
            imgNew
                .contrast(valor)
                .getBufferAsync(Jimp.AUTO).then((res)=>{
                    callback(res);
                });
        }
    });
}

function greyScaleImg (img, callback){
    Jimp.read(img, (err, newImg)=>{
        if (err){
            console.log(err);
        } else {
            newImg.greyscale()
            .getBufferAsync(Jimp.AUTO).then((res)=>{
                callback(res);
            })
        }
    });
}

function invertColors (img, callback){
    Jimp.read(img, (err, newImg)=>{
        if (err){
            console.log(err);
        } else {
            newImg.invert()
            .getBufferAsync(Jimp.AUTO).then((res)=>{
                callback(res);
            })
        }
    });
}

function gaussianBlur(img, valor, callback) {
    Jimp.read(img, (err, imgNew) => {
        if (err) {
            console.log(err);
        } else {
            imgNew
                .gaussian(valor)
                .getBufferAsync(Jimp.AUTO).then((res)=>{
                    callback(res);
                });
        }
    });
}

function fastBlur(img, valor, callback) {
    Jimp.read(img, (err, imgNew) => {
        if (err) {
            console.log(err);
        } else {
            imgNew
                .blur(valor)
                .getBufferAsync(Jimp.AUTO).then((res)=>{
                    callback(res);
                });
        }
    });
}

module.exports.pixelear1 = pixelear1;
module.exports.dither=dither;
module.exports.brightness=brightness;
module.exports.contrast=contrast;
module.exports.greyScaleImg=greyScaleImg;
module.exports.invertColors=invertColors;
module.exports.gaussianBlur=gaussianBlur;
module.exports.fastBlur=fastBlur;