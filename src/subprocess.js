/* eslint-disable no-undef */
import { ipcMain } from 'electron';

//spawn child process of python script
const { spawn } = require('child_process');

//function for running python script
export function runScript(mainWindow) {
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
        let data = JSON.parse(arg);
        childProcess.stdin.write(data.file + '\n');
    });

    ipcMain.on('message', (event, arg) => {
        // let data = JSON.parse(arg);
        childProcess.stdin.write(arg + '\n');
    });

    ipcMain.on('summarize', (event, arg) => {
        childProcess.stdin.write(arg + '\n');
    });
}
