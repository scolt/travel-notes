const electron = require('electron');
const app = electron.app;  // Модуль контролирующей жизненный цикл нашего приложения.
const BrowserWindow = electron.BrowserWindow;  // Модуль создающий браузерное окно.

var mainWindow = null;
app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        icon: __dirname + '/www/icon.png'
    });
    mainWindow.loadURL('file://' + __dirname + '/www/index.html');
    mainWindow.setMenu(null);
    //mainWindow.webContents.openDevTools();
    mainWindow.webContents.executeJavaScript(`startApp()`);

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
