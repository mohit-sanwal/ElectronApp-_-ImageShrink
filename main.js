const {app, BrowserWindow} = require('electron')


function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'ImageShrink',
        width: 500,
        height: 600,
    })
}

console.log('hello world');

app.on('ready', createMainWindow)