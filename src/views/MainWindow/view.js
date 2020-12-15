const lector = require("../../lector");
const path=require("path");

let btnAddZoom;
let btnRestZoom;
let imgVista;

let view = null;

document.addEventListener('DOMContentLoaded', function () {
    btnAddZoom = document.getElementById("btn-add-zoom");
    btnRestZoom = document.getElementById("btn-rest-zoom");
    imgVista= document.getElementById("img-vista");
    view=new ViewFinder(imgVista);

    btnAddZoom.onclick=zoomMas;
    btnRestZoom.onclick=mover;
    cambiarImagenEnLienzo();
    
});

function cambiarImagenEnLienzo(){
    let archivo = lector.leerImagen(path.join(__dirname, "../../img/img-pruebas2.png"));
    let imagen=Buffer.from(archivo).toString('base64')
    imgVista.style.backgroundImage= `url(data:image/jpeg;base64,${imagen})`.replace(/(\r\n|\n|\r)/gm, "");
}

function zoomMas(){
    view.increaseZoom(20);
    //imgVista.style.backgroundSize = "50" + "px " + "50" + "px";
}

function zoomMenos (){

}

function mover (){
    imgVista.style.backgroundPosition = "-" + "100" + "px -" + "100" + "px";
}