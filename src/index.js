const { app, BrowserWindow, Menu, ipcMain, session } = require('electron');
const path = require("path");
const url = require("url");

var mainWindow;
var infoWindow;

app.on("ready", () => {
    createMainWindow();
});

function createMainWindow() {
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, "img/appIcon.png"),
        title: "Grand Pixel",
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        show: false
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "views/MainWindow/mainWindow.html"),
        protocol: "file",
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    mainWindow.setMenu(mainMenu);
    mainWindow.maximize();
    mainWindow.on('closed', () => {
        app.quit();
    });
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
}

function createInfoWindow (){
    infoWindow=new BrowserWindow ({
        icon: path.join(__dirname, "img/appIcon.png"),
        title: "Thanks To",
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        show: false,
        width: 500,
        height: 500
    });

    infoWindow.loadURL(url.format({
        pathname: path.join(__dirname, "views/InfoWindow/infoWindow.html"),
        protocol: "file",
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    infoWindow.setMenu(mainMenu);
    infoWindow.once('ready-to-show', () => {
        infoWindow.show()
    })
}

//WINDOW´S EVENTS
ipcMain.on("new-info-window", ()=>{
    createInfoWindow();
})

//MENU
let mainMenuTemplate = null;
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate=[{
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    }]
}