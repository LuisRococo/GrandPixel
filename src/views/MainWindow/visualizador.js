let zoom = 100;
let minZoom = 1;
let maxZoom = 500;
let x = 0;
let y = 0;

function increaseZoom(componente, suma) {
    componente.style.backgroundSize = "50" + "px " + "50" + "px";
}

function decreaseZoom(componente, resta) {

}

class Tab {

    constructor(CompImage) {
        this.visor = new ViewFinder(CompImage);
        this.component = CompImage;
        this.zoom = 100;
    }
}

class ViewFinder {

    constructor(CompImage) {
        this.CompImage = CompImage;
    }

    increaseZoom(zoom) {
        let newZoom = zoom + this.zoom;
        let dimensions = this.getImageDimensions();
        console.log("yolo: ",dimensions);
    }

    getImageDimensions() {
        var imageSrc = this.CompImage.style.backgroundImage;
        var image = new Image();
        image.src = imageSrc;

        var width = image.width, height = image.height;
        return { width, height };
    }
}
