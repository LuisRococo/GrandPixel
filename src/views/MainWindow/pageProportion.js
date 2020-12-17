let contWorkbench=null;
let menu=null;

document.addEventListener('DOMContentLoaded', function () {
    contWorkbench=document.getElementById("cont-workbench");
    menu=document.getElementById("menu");

    window.addEventListener('resize', calcularScroll);
    calcularScroll();
});

function calcularScroll() {
    let alturaTotal = window.innerHeight;
    let alturaMenu = menu.clientHeight;
    let alturaWorkbench = alturaTotal-alturaMenu;
    contWorkbench.style.height=alturaWorkbench+"px";
}