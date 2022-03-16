import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

import { initializeGit } from './utils/initializeGit'

require('events').EventEmitter.defaultMaxListeners = 50;

const os = require("os");
const pty = require("node-pty");
const fs = require("fs");

var clear = require('./utils/start_over');
var shell = os.platform() === "win32" ? "powershell.exe" : "bash";
var replicate = require('./replicate_repo');
let trapReady = new Map();

const isTrapReady = () => ![
  'VizWindow', //'FilesChangedViz', 'StatusViz',
].every(flag => trapReady.get(flag));

const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let win;

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  var ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 120,
    cwd: process.CWD,
    env: process.env
  });

  /* X-term integration using node-pty tutorial from VINCE on YouTube
  * Source: https://www.youtube.com/watch?v=vhDBbbMJWoY */
  ptyProcess.on("data", function(data) {
    win.webContents.send("terminal.incData", data);
  });

  ipcMain.on("terminal.toTerm", function(event, data) {
    win.webContents.send("user_input", data);
    // Holds request until front end is ready (Traps newline)
    const isNewLine = data.match(/^\s+/) && data !== ' ';
    if (isTrapReady() || !isNewLine) ptyProcess.write(data);
  });

  ipcMain.on("terminal.toTerm.force", (_, { pwd, command }) => {
    // There is a race condition after replicate repo and before terminal force write
    const removeLock = [
      `if [ -f "${pwd}/.git/index.lock" ]`,
      `then rm "${pwd}/.git/index.lock"`,
      'fi',
      'clear',
      '',
    ].join('\n');
    ptyProcess.write(removeLock);
    ptyProcess.write(command);
  });

  ipcMain.on("runTerminalCommand", (_, data) => {
    const isTrapSet = isTrapReady();
    // Indicates the repo front end is in sync
    trapReady.set(data, true);

    if (!isTrapSet || data == 'VizWindow') {
      // runs command from trap
      console.warn('loading trap', data);
      ptyProcess.write('\n');
    }    
  });

  ipcMain.on('setCommand', (event, data) => {
    event.sender.send('setCommand', data);
  })

  ipcMain.on("statusUpdate", function(event, data) {
    win.webContents.send('getStatus', data);
  });

  ipcMain.on('trapClear', () => trapReady.clear());
 
  async function replicateRepoWrapper(directory, version=0) {
    if (directory.includes('.gb.gb')) throw Error(`Bad directory (double gb) ${directory}`);
    ptyProcess.kill('SIGINT'); // Sends ctrl-c to avoid current commend
    win.webContents.send("finderOpened");
    const base_pwd = directory.includes('.gb')
      ? directory.substring(0, directory.indexOf('.gb'))
      : directory;
    if (!fs.existsSync(base_pwd + '/.git')){
      win.webContents.send("notGit");
      await initializeGit(directory);
    }

    const new_dir = await replicate.replicate_repo(directory, version);
    win.webContents.send('giveFilePath', new_dir);
  }

  // opens finder modal
  ipcMain.on("openFinder", async function() {
    dialog.showOpenDialog({
      defaultPath:app.getPath('home'),
      // only enables user to select directories
      properties:['openDirectory'],
    }).then(({ filePaths }) => replicateRepoWrapper(filePaths[0])).catch(console.error);
  })

  ipcMain.on("destructiveCommandClone",
    (_, { directory, version }) => replicateRepoWrapper(directory, version));
  
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    await win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    clear.start_over();
    app.quit()
  }
})

app.allowRendererProcessReuse = false;

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        clear.start_over();
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      clear.start_over();
      app.quit()
    })
  }
}
