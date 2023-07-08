const {app, BrowserWindow, Menu} = require('electron')

process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform == 'darwin' ? true : false;

let mainWindow;
function createWindow() {
     mainWindow = new BrowserWindow({
        title: 'ImageShrink',
        width: 500,
        height: 600,
        icon: './assets/Icon_256x256.png',
        resizable: isDev ? true : false,
    })
    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    mainWindow.loadFile('./app/index.html')
}


app.whenReady().then(() => {
    createWindow();
    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu);
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow()
        }
      })
})

const menu = [
    ...(isMac ? [{role: 'appMenu'}]: []),
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                // accelerator: isMac ? 'Command+W' : 'Ctrl+W',
                accelerator: 'CmdOrCtrl+W',
                click: () => app.quit()
            },
            {
                label: 'stay',
                click: () => app.quit()
            }
        ]
    }
]


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })