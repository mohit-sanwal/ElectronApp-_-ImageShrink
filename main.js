const {app, BrowserWindow, Menu, globalShortcut} = require('electron')

process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform == 'darwin' ? true : false;

let mainWindow;


function createAboutWindow() {
  const aboutWindow = new BrowserWindow({
    title: 'about window',
    width: 400,
    height: 400,
    backgroundColor: 'pink',
    icon: './assets/Icon_256x256.png',
    resizable: isDev ? true : false,
  })

  aboutWindow.loadFile('./app/about.html')
}

function createMainWindow() {
     mainWindow = new BrowserWindow({
        title: 'ImageShrink',
        width: isDev ? 900 : 500,
        height: 600,
        backgroundColor: 'white',
        icon: './assets/Icon_256x256.png',
        resizable: isDev ? true : false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          // enableRemoteModule: true,
        },
    })
    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    mainWindow.loadFile('./app/index.html')
}


app.whenReady().then(() => {
    createMainWindow();
    globalShortcut.register('CmdOrCtrl+R', ()=> mainWindow.reload());
    globalShortcut.register(isMac ? 'Command+Alt+I': 'Ctrl+Shift+I', ()=> mainWindow.toggleDevTools());

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu);
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow()
        }
      })
})

const menu = [
    ...(isMac ? [{label: app.name, submenu: [{label: 'About', click: createAboutWindow,}]}]: []),
    {
        // label: 'File',
        // submenu: [
        //     {
        //         label: 'Quit',
        //         // accelerator: isMac ? 'Command+W' : 'Ctrl+W',
        //         accelerator: 'CmdOrCtrl+W',
        //         click: () => app.quit()
        //     },
        //     {
        //         label: 'stay',
        //         click: () => app.quit()
        //     }
        // ]

        // the above code can be replaceble by below line
        role: 'fileMenu'
    },
    ...(isDev ? [{
        label: 'Dev',
        submenu: [
            {role : 'reload'},
            {role : 'forcereload'},
            {type : 'separator'},
            {role : 'toggledevtools'},
        ]
    }] : []),
    {
        label: 'about',
        click: () => createAboutWindow()
    }
]


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })