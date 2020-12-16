const { app, BrowserWindow, Menu, ipcMain, session } = require('electron');
const path = require("path");
const url = require("url");
//const Jimp=require("jimp/es");

var mainWindow;

app.on("ready", () => {
    createMainWindow();
});

function createMainWindow() {
    mainWindow = new BrowserWindow({
        show: false,
        icon: path.join(__dirname, "img/appIcon.png"),
        title: "Grand Pixel",
        webPreferences: {
            nodeIntegration: true
        }
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

//MENU
const mainMenuTemplate = [
    {
        label: 'File'
    }
]

if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
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
    })
}