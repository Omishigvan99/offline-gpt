import { runScript } from './subprocess';

/* eslint-disable no-undef */
const { app, BrowserWindow } = require('electron');
//global variable for main window
let mainWindow = null;

//function for creating main window
function createMainWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // open dev tools if run in dev mode
    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools();
    }

    win.maximize();
    return win;
}

app.whenReady().then(() => {
    // create main window when electron is ready
    mainWindow = createMainWindow();

    // run python script
    runScript(mainWindow);

    // macOS only
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
});

// quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
