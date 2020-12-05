'use strict'

import { app, Menu, ipcMain, protocol, shell, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
// const isMac = process.platform === 'darwin'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let win = null;
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    minWidth: 560,
    minHeight: 500,
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: true
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  win.maximize()

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  const template = [
    { label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }]},
    { label: 'File',
      submenu: [
        { role: 'close' }
      ]},
    { label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { label: 'Search',
          click: () => {
            win.webContents.send('shortkey-message', 'search')
          },
          accelerator: 'CmdOrCtrl + F' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        { label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]}
      ]},
    { label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { label: 'Go To Show Screen',
          click: () => {
            win.webContents.send('shortkey-message', 'go-to-show-screen')
          },
          accelerator: 'CmdOrCtrl + Option + 1' },
        { label: 'Go To Search Screen',
          click: () => {
            win.webContents.send('shortkey-message', 'go-to-search-screen')
          },
          accelerator: 'CmdOrCtrl + Option + 2' },
        { type: 'separator' },
        { label: 'Toggle NKJV',
          click: () => {
            win.webContents.send('shortkey-message', 'toggle-nkjv')
          },
          accelerator: 'CmdOrCtrl + 1' },
        { label: 'Toggle 개역한글',
          click: () => {
            win.webContents.send('shortkey-message', 'toggle-kyhg')
          },
          accelerator: 'CmdOrCtrl + 2' },
        { label: 'Toggle RVR1960',
          click: () => {
            win.webContents.send('shortkey-message', 'toggle-rvr')
          },
          accelerator: 'CmdOrCtrl + 3' },
        { label: 'Show All',
          click: () => {
            win.webContents.send('shortkey-message', 'show-all')
          },
          accelerator: 'CmdOrCtrl + 4' },
        { type: 'separator' },
        { label: 'Increase Font Size',
          click: () => {
            win.webContents.send('shortkey-message', 'font-increase')
          },
          accelerator: 'CmdOrCtrl + =' },
        { label: 'Decrease Font Size',
          click: () => {
            win.webContents.send('shortkey-message', 'font-decrease')
          },
          accelerator: 'CmdOrCtrl + -' },
        { label: 'Restore Font Size',
          click: () => {
            win.webContents.send('shortkey-message', 'font-restore')
          },
          accelerator: 'CmdOrCtrl + 0' },
        { type: 'separator' },
        { label: 'Increase Verse Container Width',
          click: () => {
            win.webContents.send('shortkey-message', 'verse-container-increase')
          },
          accelerator: 'CmdOrCtrl + Option + =' },
        { label: 'Decrease Verse Container Width',
          click: () => {
            win.webContents.send('shortkey-message', 'verse-container-decrease')
          },
          accelerator: 'CmdOrCtrl + Option + -' },
        { label: 'Restore Verse Container Width',
          click: () => {
            win.webContents.send('shortkey-message', 'verse-container-restore')
          },
          accelerator: 'CmdOrCtrl + Option + 0' },
        { type: 'separator' },
        { role: 'togglefullscreen' }]},
    { label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }]},
    { label: 'Help',
      submenu: [
        { label: 'jbch.org',
          click: async () => {
            shell.openExternal("http://www.jbch.org/")
          }},
        { type: 'separator' },
        { label: 'Suggest Feature',
          click: async () => {
            win.webContents.send('shortkey-message', 'suggest-feature')
          }
        },
        { label: 'Report Issue',
          click: async () => {
            win.webContents.send('shortkey-message', 'report-issue')
          }
        }
      ]
    }
  ]
  
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  win.on('close', (event) => {
    if (app.quitting) {
      win = null
    } else {
      event.preventDefault()
      win.hide()
    }   
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }

  // Remove all listeners for event messages
  ipcMain.removeAllListeners('shortkey-message')
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  // if (BrowserWindow.getAllWindows().length === 0) createWindow()
  win.show()
})

app.on('before-quit', () => {
  app.quitting = true
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
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
