// Modules to control application life and create native browser window
const { app, BrowserWindow, screen, desktopCapturer, dialog } = require('electron')
const usbDetect = require('usb-detection');
const path = require('path')
const axios = require('axios')
usbDetect.startMonitoring();

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
    //   // Create a window that fills the screen's available work area.
    const primaryDisplay = screen.getPrimaryDisplay();
    //const { width, height } = primaryDisplay.workAreaSize
    swidth = primaryDisplay.workAreaSize.width;
    sheight = primaryDisplay.workAreaSize.height;
    mainWindow = new BrowserWindow({ width: swidth, height: sheight, frame: true, title: "Gradious - Code Evaluator" })
    // mainWindow.removeMenu();
    mainWindow.webContents.openDevTools();


    checkWindows(function (res) {
        if (res) {
            // checkUSB(function (usbres) {
                // console.log("chk usbbbb")
                // if (usbres) {
                    checkscreens(function (screenres) {

                        if (screenres) {
                          
                            mainWindow.loadURL("http://localhost:3000");
                        }
                        else {
                            mainWindow.loadFile('./src/error.html');
                        }
                    })

                // }
                // else {
                    // mainWindow.loadFile('./src/error.html');
                // }

            // })
        } else {
            // mainWindow.loadURL("https://www.youtube.com/");
            mainWindow.loadFile('./src/error.html');
        }
    });


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

function checkWindows(cb) {

    desktopCapturer.getSources({ types: ['window'] }).then(sources => {
        if (sources.length > 1) {
            // showDialog("You Have More Than one applications open, Please close other windows");
            cb(true);
        }
        else {
            cb(false);
        }
    }).catch((err) => { console.log(err); cb(false); });


}

function checkUSB(cb) {
    var chk = 0;
    usbDetect.find(function (err, devices) {
        //  console.log('find', devices, err);
        if (devices.length > 0) {
            for (var i = 0; i < devices.length; i++) {
                if (devices[i].serialNumber !== "") {
                    // showDialog("Please disconnect all your pen drives/ USB Devices");
                    chk = 1;
                    //  cb(false);
                }

            }

        }
        if (chk = 0) {
            cb(false);
        }
        else {
            cb(true);
        }

    });


}

usbDetect.on('add', function (device) { showDialog("you connected a new device"); });

function showDialog(Message) {
    dialog.showMessageBox(
        mainWindow,
        {
            message: Message,
            buttons: ["OK", "Cancel"],
            defaultId: 0, // bound to buttons array
            cancelId: 1 // bound to buttons array
        })
        .then(result => {
            if (result.response === 0) {
                return (false);
                // bound to buttons array
                console.log("Default button clicked.");
            } else if (result.response === 1) {
                // bound to buttons array
                return (false);
                console.log("Cancel button clicked.");
            }
            return (false);
        }
        );
    return (true);
}


function checkscreens(cb) {
    desktopCapturer.getSources({ types: ['screen'] }).then(sources => {

        if (sources.length > 1) {
            // showDialog("You Have More Than one Monitor attached, Please disconnect and keep only one display");
            cb(false);
        }
        else {
            cb(true);
        }
    }).catch((err) => { cb(false); console.log(err) });

}


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