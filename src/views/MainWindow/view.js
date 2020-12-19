const lector = require("../../lector");
const efectos = require("../../efectos");
const { dialog } = require('electron').remote;
const remote = require("electron").remote;
const { ipcRenderer } = require('electron');
var audio = new Audio("../../img/MilosThemeSong.mp3");

let imageOriginal = null;
let imagenFinal = null;
let direccionOriginal = null;

let rngPix1 = null; let lblPix1 = null;
let contWorkbench = null; let menu = null;
let imgViewer = null; let loadAnimationPnl = null;
let noImagePnl = null; let rngBright = null; let lblBright = null;
let rngContrast = null; let lblContrast = null;
let rngGaussBlur = null; let lblGaussBlur = null;
let rngFastBlur = null; let lblFastBlur = null;
let motivacionBoolean = false; let motivacionAnimacion;

document.addEventListener('DOMContentLoaded', function () {
    imgViewer = document.getElementById("img-vista");
    rngPix1 = document.getElementById("rng-pix-1");
    lblPix1 = document.getElementById("lbl-pix-1");
    contWorkbench = document.getElementById("cont-workbench");
    menu = document.getElementById("menu");
    loadAnimationPnl = document.getElementById("loading-animation");
    noImagePnl = document.getElementById("no-img-background");
    rngBright = document.getElementById("rng-bright");
    lblBright = document.getElementById("lbl-bright");
    rngContrast = document.getElementById("rng-contrast");
    lblContrast = document.getElementById("lbl-contrast");
    rngGaussBlur = document.getElementById("rng-gauss-blur");
    lblGaussBlur = document.getElementById("lbl-gauss-blur");
    rngFastBlur = document.getElementById("rng-fast-blur");
    lblFastBlur = document.getElementById("lbl-fast-blur");
    motivacionAnimacion = document.getElementById("motivational-animation");

    window.addEventListener('resize', calcularScroll);

    calcularScroll();
    inicializarLabelsConSlider();
    document.getElementById("animacion-loading-app").remove();
});

function inicializarLabelsConSlider() {
    lblPix1.value = rngPix1.value;
    lblBright.value = rngBright.value;
    lblContrast.value = rngContrast.value;
    lblGaussBlur.value = rngGaussBlur.value;
    lblFastBlur.value = rngFastBlur.value;
}

function motivacion() {
    if (motivacionBoolean) {
        motivacionAnimacion.style.display = "none";
        audio.pause();
        audio.currentTime = 0;
    } else {
        motivacionAnimacion.style.display = "flex";
        audio.play();
    }
    motivacionBoolean = !motivacionBoolean;
}

//PIXELEADO
function rangeEventPix1() {
    lblPix1.value = rngPix1.value;
}

function aplicarPixeleado1() {
    if (imagenFinal != null) {
        showLoadingAnimation(true);
        let tamPix = parseInt(rngPix1.value);
        efectos.pixelear1(Buffer.from(imagenFinal), tamPix, (res) => {
            cambiarImagenEnLienzo(res);
            imagenFinal = res;
            showLoadingAnimation(false);
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

function testearPixelado1() {
    if (imagenFinal != null) {
        showLoadingAnimation(true);
        let tamPix = parseInt(rngPix1.value);
        efectos.pixelear1(Buffer.from(imagenFinal), tamPix, (res) => {
            cambiarImagenEnLienzo(res);
            showLoadingAnimation(false);
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

//DITHER
function aplicarDither() {
    if (imagenFinal != null) {
        showLoadingAnimation(true);
        efectos.dither(Buffer.from(imagenFinal), (res) => {
            cambiarImagenEnLienzo(res);
            imagenFinal = res;
            showLoadingAnimation(false);
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

function testearDither() {
    if (imagenFinal != null) {
        showLoadingAnimation(true);
        efectos.dither(Buffer.from(imagenFinal), (res) => {
            cambiarImagenEnLienzo(res);
            showLoadingAnimation(false);
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

//BRIGHTNESS
function rangeEventBright() {
    lblBright.value = rngBright.value;
}

function aplicarBright() {
    if (imagenFinal != null) {
        showLoadingAnimation(true);
        let valor = parseFloat(rngBright.value);
        efectos.brightness(Buffer.from(imagenFinal), valor, (res) => {
            cambiarImagenEnLienzo(res);
            imagenFinal = res;
            showLoadingAnimation(false);
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

function testearBright() {
    if (imagenFinal != null) {
        showLoadingAnimation(true);
        let valor = parseFloat(rngBright.value);
        efectos.brightness(Buffer.from(imagenFinal), valor, (res) => {
            cambiarImagenEnLienzo(res);
            showLoadingAnimation(false);
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

//CONTRAST
function rangeEventContrast() {
    lblContrast.value = rngContrast.value;
}

function aplicarContrast() {
    if (imagenFinal != null) {
        showLoadingAnimation(true);
        let valor = parseFloat(rngContrast.value);
        efectos.contrast(Buffer.from(imagenFinal), valor, (res) => {
            cambiarImagenEnLienzo(res);
            imagenFinal = res;
            showLoadingAnimation(false);
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

function testearContrast() {
    if (imagenFinal != null) {
        showLoadingAnimation(true);
        let valor = parseFloat(rngContrast.value);
        efectos.contrast(Buffer.from(imagenFinal), valor, (res) => {
            cambiarImagenEnLienzo(res);
            showLoadingAnimation(false);
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

//GREY SCALE
function aplicarGreyScale() {
    if (imagenFinal != null) {
        showLoadingAnimation(true);
        efectos.greyScaleImg(Buffer.from(imagenFinal), (res) => {
            cambiarImagenEnLienzo(res);
            imagenFinal = res;
            showLoadingAnimation(false);
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

function testearGreyScale() {
    if (imagenFinal != null) {
        showLoadingAnimation(true);
        efectos.greyScaleImg(Buffer.from(imagenFinal), (res) => {
            cambiarImagenEnLienzo(res);
            showLoadingAnimation(false);
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

//INVERT COLORS
function aplicarInvertColors() {
    if (imagenFinal != null) {
        showLoadingAnimation(true);
        efectos.invertColors(Buffer.from(imagenFinal), (res) => {
            cambiarImagenEnLienzo(res);
            imagenFinal = res;
            showLoadingAnimation(false);
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

function testearInvertColors() {
    if (imagenFinal != null) {
        showLoadingAnimation(true);
        efectos.invertColors(Buffer.from(imagenFinal), (res) => {
            cambiarImagenEnLienzo(res);
            showLoadingAnimation(false);
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

//GAUSS BLUR
function rangeEventGaussBlur() {
    lblGaussBlur.value = rngGaussBlur.value;
}

function aplicarGaussBlur() {
    if (imagenFinal != null) {
        showLoadingAnimation(true);
        let value = parseInt(rngGaussBlur.value);
        efectos.gaussianBlur(Buffer.from(imagenFinal), value, (res) => {
            cambiarImagenEnLienzo(res);
            imagenFinal = res;
            showLoadingAnimation(false);
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

function testearGaussBlur() {
    if (imagenFinal != null) {
        showLoadingAnimation(true);
        let value = parseInt(rngGaussBlur.value);
        efectos.gaussianBlur(Buffer.from(imagenFinal), value, (res) => {
            cambiarImagenEnLienzo(res);
            showLoadingAnimation(false);
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

//FAST BLUR
function rangeEventFastBlur() {
    lblFastBlur.value = rngFastBlur.value;
}

function aplicarFastBlur() {
    if (imagenFinal != null) {
        showLoadingAnimation(true);
        let value = parseInt(rngFastBlur.value);
        efectos.fastBlur(Buffer.from(imagenFinal), value, (res) => {
            cambiarImagenEnLienzo(res);
            imagenFinal = res;
            showLoadingAnimation(false);
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

function testearFastBlur() {
    if (imagenFinal != null) {
        showLoadingAnimation(true);
        let value = parseInt(rngFastBlur.value);
        efectos.fastBlur(Buffer.from(imagenFinal), value, (res) => {
            cambiarImagenEnLienzo(res);
            showLoadingAnimation(false);
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

//DEMAS
function abrirVentanaInfo() {
    ipcRenderer.send('new-info-window');
}

function undoTest() {
    if (imagenFinal != null) {
        cambiarImagenEnLienzo(imagenFinal);
    } else {
        mensajeErrImgNoCargada();
    }
}

function removeNoImgPanel() {
    noImagePnl.style.display = "none";
}

function guardarImagen() {
    if (imagenFinal != null) {
        openFileChooserSave((res) => {
            if (res != null) {
                lector.guardarImagen(res, imagenFinal);
            }
        });
    } else {
        mensajeErrImgNoCargada();
    }
}

function showLoadingAnimation(bool) {
    if (bool) {
        loadAnimationPnl.style.display = "flex";
    } else {
        loadAnimationPnl.style.display = "none";
    }
}

function mensajeErrImgNoCargada() {
    document.getElementById("btn-trigger-modal").click();
}

function resetImgToOriginal() {
    if (imagenFinal != null) {
        imagenFinal = imageOriginal;
        cambiarImagenEnLienzo(imageOriginal);
    } else {
        mensajeErrImgNoCargada();
    }
}

function cambiarImagenEnLienzo(imagen_binary) {
    let imagen = Buffer.from(imagen_binary).toString('base64')
    imgViewer.style.backgroundImage = `url(data:image/jpeg;base64,${imagen})`.replace(/(\r\n|\n|\r)/gm, "");
}

function cambiarImagen() {
    openFileChooserLoad((res) => {
        if (res != null) {
            let archivo = lector.leerImagen(res);
            direccionOriginal = res;
            imageOriginal = archivo;
            imagenFinal = archivo;
            cambiarImagenEnLienzo(imageOriginal);
            removeNoImgPanel();
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
    showLoadingAnimation(true)
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