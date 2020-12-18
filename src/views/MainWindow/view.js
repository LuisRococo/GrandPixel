const lector = require("../../lector");
const path = require("path");
const efectos = require("../../efectos");
const { dialog } = require('electron').remote;
const remote = require("electron").remote;

let imageOriginal = null;
let imagenFinal = null;
let direccionOriginal = null;

let btnTest = null; let btnLoadImg = null; let btnResetImg = null;
let btnPix1 = null; let rngPix1 = null; let lblPix1 = null; let btnTestPix1 = null;
let contWorkbench = null; let menu = null;
let imgViewer = null; let btnSave=null;

document.addEventListener('DOMContentLoaded', function () {
    imgViewer = document.getElementById("img-vista");
    btnTest = document.getElementById("btn-test");
    btnPix1 = document.getElementById("btn-pix-1");
    rngPix1 = document.getElementById("rng-pix-1");
    lblPix1 = document.getElementById("lbl-pix-1");
    btnTestPix1 = document.getElementById("btn-test-pix-1");
    btnLoadImg = document.getElementById("btn-load-img");
    contWorkbench = document.getElementById("cont-workbench");
    menu = document.getElementById("menu");
    btnResetImg = document.getElementById("btn-reset");
    btnSave=document.getElementById("btn-save");

    window.addEventListener('resize', calcularScroll);
    btnTest.onclick = test;
    btnTestPix1.onclick = testearPixelado1;
    btnPix1.onclick = aplicarPixeleado1;
    btnLoadImg.onclick = cambiarImagen;
    rngPix1.oninput = function () { lblPix1.value = rngPix1.value; }
    btnResetImg.onclick = resetImgToOriginal;
    btnSave.onclick=guardarImagen;

    calcularScroll();
});

function guardarImagen (){
    if (imagenFinal!=null){
        openFileChooserSave((res)=>{
            if (res!=null){
                lector.guardarImagen(res, imagenFinal);
            }
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

function aplicarPixeleado1() {
    if (imagenFinal != null) {
        let tamPix = parseInt(rngPix1.value);
        efectos.pixelear1(Buffer.from(imagenFinal), tamPix, (res) => {
            cambiarImagenEnLienzo(res);
            imagenFinal = res;
        });
    } else {
        mensajeErrImgNoCargada();
    }

}

function testearPixelado1() {
    if (imagenFinal != null) {
        let tamPix = parseInt(rngPix1.value);
        efectos.pixelear1(Buffer.from(imagenFinal), tamPix, (res) => {
            cambiarImagenEnLienzo(res);
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

function mensajeErrImgNoCargada() {
    document.getElementById("btn-trigger-modal").click();
}

function resetImgToOriginal() {
    imagenFinal = imageOriginal;
    cambiarImagenEnLienzo(imageOriginal);
}

function cambiarImagenEnLienzo(imagen_binary) {
    let imagen = Buffer.from(imagen_binary).toString('base64')
    imgViewer.style.backgroundImage = `url(data:image/jpeg;base64,${imagen})`.replace(/(\r\n|\n|\r)/gm, "");
}

function cambiarImagen() {
    openFileChooserLoad((res) => {
        if (res != null) {
            let archivo = lector.leerImagen(res);
            direccionOriginal=res;
            imageOriginal = archivo;
            imagenFinal = archivo;
            cambiarImagenEnLienzo(imageOriginal);
        }
    });
}

function openFileChooserLoad(callback) {
    const opciones = {
        defaultPath: "c:/",
        filters: [{ name: "Images", extensions: ["jpg", "png", "gif"] }],
        properties: ['openFile']
    };
    dialog.showOpenDialog(remote.getCurrentWindow(), opciones).then(function (response) {
        if (!response.canceled) {
            callback(response.filePaths[0]);
        } else {
            callback(null);
        }
    });
}

function openFileChooserSave(callback) {
    const opciones = {
        defaultPath: direccionOriginal,
        properties: ['openDirectory']
    };
    dialog.showSaveDialog(remote.getCurrentWindow(), opciones).then(function (response) {
        if (!response.canceled) {
            callback(response.filePath);
        } else {
            callback(null);
        }
    });
}

function test() {
    let imgBinary = imageOriginal;
    efectos.test(Buffer.from(imgBinary), (res) => {
        strTag = imgBinaryToString64(res);
        imgViewer.style.backgroundImage = strTag;
    });
}

function imgBinaryToString64(binary) {
    let imagen = Buffer.from(binary).toString('base64')
    return `url(data:image/jpeg;base64,${imagen})`.replace(/(\r\n|\n|\r)/gm, "");
}

function mover() {
    imgViewer.style.backgroundPosition = "-" + "100" + "px -" + "100" + "px";
}

function calcularScroll() {
    let alturaTotal = window.innerHeight;
    let alturaMenu = menu.clientHeight;
    let alturaWorkbench = alturaTotal - alturaMenu;
    contWorkbench.style.height = alturaWorkbench + "px";
}