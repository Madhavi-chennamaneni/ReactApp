// Modules to control application life and create native browser window
const { app, BrowserWindow, screen } = require('electron')
const path = require('path')
const axios = require('axios')

require('@electron/remote/main').initialize();
let mainWindow, count = 0;

var sheight, swidth;
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        title: "Gradious - Code Evaluator",
        frame: false,
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // and load the index.html of the app.
    // mainWindow.loadFile('index.html')
    //mainWindow.loadURL("localhost:3000")
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.whenReady().then(createWindow)

app.whenReady().then(() => {
    //   // We cannot require the screen module until the app is ready.
    const { screen } = require('electron')
    //   // Create a window that fills the screen's available work area.
    const primaryDisplay = screen.getPrimaryDisplay();
    //const { width, height } = primaryDisplay.workAreaSize
    swidth = primaryDisplay.workAreaSize.width;
    sheight = primaryDisplay.workAreaSize.height;

    mainWindow = new BrowserWindow({ width: swidth, height: sheight, frame: true, title: "Gradious - Code Evaluator" })
    mainWindow.removeMenu();
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL("http://localhost:3000")
    const { desktopCapturer } = require('electron')
    //   setInterval( ()=>{
    //       desktopCapturer.getSources({ types: ['screen'],thumbnailSize: {height: sheight, width: swidth} }).then( sources => {
    //               const content = sources[0].thumbnail.toPNG(); // The image to display the screenshot
    //               console.log(sources[0].thumbnail.getSize)
    //               const FormData = require('form-data'); // npm install --save form-data
    //               const form = new FormData();
    //               form.append('file', content,`screen${count}.png`);              
    //               const request_config = {
    //                 headers: {
    //                   ...form.getHeaders()
    //                 }
    //               };
    //               count++;
    //               return axios.post('http://localhost:3005/api/upload', form, request_config,`test${count}.png`).then(res=>(console.log(res.data))).catch((err) => { console.log(err) });
    //             }).catch((err) => { console.log(err) });
    //           },5000)
}).catch((err) => { console.log(err) });

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

//starting when the app is ready
app.on('ready', () => {

});