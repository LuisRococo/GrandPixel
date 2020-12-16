const lector = require("../../lector");
const path = require("path");
const efectos = require("./efectos");
const { dialog } = require('electron').remote;
const remote = require("electron").remote;

let imgVista = null;
let contOpciones = null;
let imagenBinary = null;
let btnTest = null;
let btnPix1 = null; let rngPix1 = null;

document.addEventListener('DOMContentLoaded', function () {
    imgVista = document.getElementById("img-vista");
    btnTest = document.getElementById("btn-test");
    contOpciones = document.getElementById("cont-opciones");
    btnPix1 = document.getElementById("btn-pix-1");
    rngPix1 = document.getElementById("rng-pix-1");

    window.addEventListener('resize', calcularScroll);
    btnTest.onclick = test;
    btnPix1.onclick = aplicarPixeleado1;

    calcularScroll();
    //cambiarImagenEnLienzo();
});

function aplicarPixeleado1() {
    //let imgBinary = lector.leerImagen(path.join(__dirname, "../../img/img-pruebas2.png"));
    let imgBinary=imagenBinary;
    let tamPix=parseInt(rngPix1.value);
    efectos.pixelear1(Buffer.from(imgBinary), tamPix, (res) => {
        strTag = imgBinaryToString64(res);
        imgVista.style.backgroundImage = strTag;
    });
}

function calcularScroll() {
    let altura = window.innerHeight;
    //let altura=window.clientHeight;
    contOpciones.style.height = altura + "px";
    console.log(altura);
}

function cambiarImagenEnLienzo(imagen_binary) {
    //let archivo = lector.leerImagen(path.join(__dirname, "../../img/img-pruebas2.png"));
    let imagen = Buffer.from(imagen_binary).toString('base64')
    imgVista.style.backgroundImage = `url(data:image/jpeg;base64,${imagen})`.replace(/(\r\n|\n|\r)/gm, "");
}

function cambiarImagen(){
    openFileChooser((res) => {
        if (res!=null){
            let archivo = lector.leerImagen(res);
            imagenBinary=archivo;
            cambiarImagenEnLienzo(imagenBinary);
        }
    });
}

function openFileChooser(callback) {
    const opciones = {
        defaultPath: "c:/",
        filters: [{ name: "Images", extensions: ["jpg", "png", "gif"] }], 
        properties: ['openFile']
    };
    dialog.showOpenDialog(remote.getCurrentWindow(), opciones).then(function (response) {
        if (!response.canceled) {
            console.log(response.filePaths[0]);
            callback(response.filePaths[0]);
        } else {
            console.log("no file selected");
            callback(null);
        }
    });
}

function test() {
    cambiarImagen();
}

function imgBinaryToString64(binary) {
    let imagen = Buffer.from(binary).toString('base64')
    return `url(data:image/jpeg;base64,${imagen})`.replace(/(\r\n|\n|\r)/gm, "");
}

function mover() {
    imgVista.style.backgroundPosition = "-" + "100" + "px -" + "100" + "px";
}