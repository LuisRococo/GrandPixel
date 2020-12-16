const lector = require("../../lector");
const path=require("path");
const efectos=require("./efectos");

let imgVista;
let imagen=null;
let btnTest;

document.addEventListener('DOMContentLoaded', function () {
    imgVista= document.getElementById("img-vista");
    btnTest=document.getElementById("btn-test");

    btnTest.onclick=test;
    //cambiarImagenEnLienzo();
});

function cambiarImagenEnLienzo(){
    let archivo = lector.leerImagen(path.join(__dirname, "../../img/img-pruebas2.png"));
    let imagen=Buffer.from(archivo).toString('base64')
    imgVista.style.backgroundImage= `url(data:image/jpeg;base64,${imagen})`.replace(/(\r\n|\n|\r)/gm, "");
}

function test(){
    let imgBinary=lector.leerImagen(path.join(__dirname, "../../img/img-pruebas2.png"));
    efectos.pixelear(Buffer.from(imgBinary), -1, (res)=>{
        strTag=imgBinaryToString64(res);
        imgVista.style.backgroundImage=strTag;
    });
}

function imgBinaryToString64(binary){
    let imagen=Buffer.from(binary).toString('base64')
    return `url(data:image/jpeg;base64,${imagen})`.replace(/(\r\n|\n|\r)/gm, "");
}

function mover (){
    imgVista.style.backgroundPosition = "-" + "100" + "px -" + "100" + "px";
}