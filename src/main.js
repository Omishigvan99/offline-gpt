/* eslint-disable no-undef */
const { app, BrowserWindow, ipcMain } = require('electron');

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

    // macOS only
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
});

// quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

//spawn child process of python script

const { spawn } = require('child_process');

let childProcess = spawn('python', ['./src/python/main.py']);

childProcess.stdout.on('data', (data) => {
    // console.log(data.toString());
    let lines = data.toString().split(/\r?\n/);

    lines.forEach((line) => {
        if (line.trim() !== '') {
            let jsonData = JSON.parse(line);

            if (jsonData.type === 'message') {
                mainWindow.webContents.send('message', JSON.stringify(jsonData));
            }
            console.log(jsonData);
        }
    });
});

childProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

childProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

childProcess.on('exit', (code) => {
    console.log(`child process exited with code ${code}`);
});

ipcMain.on('file-upload', (event, arg) => {
    data = JSON.parse(arg);
    childProcess.stdin.write(data.file + '\n');
});

ipcMain.on('message', (event, arg) => {
    data = JSON.parse(arg);
    childProcess.stdin.write(data.message + '\n');
});
