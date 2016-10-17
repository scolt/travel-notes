const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        icon: __dirname + '/www/icon.png'
    });
    mainWindow.loadURL('file://' + __dirname + '/www/index.html');
    mainWindow.setMenu(null);
    mainWindow.webContents.executeJavaScript(`startApp()`);
    mainWindow.on('closed', () => mainWindow = null);
});
