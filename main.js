const { app, BrowserWindow, ipcMain, screen, clipboard, shell } = require('electron');
const path = require('path');
const fs = require('fs');

let win;
const storagePath = path.join(app.getPath('userData'), 'state.json');

app.on('ready', () => {
  const { width: screenW } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    width: 480,
    height: 680,
    x: screenW - 500,
    y: 50,
    minWidth: 360,
    minHeight: 400,
    alwaysOnTop: true,
    opacity: 1,
    frame: true,
    resizable: true,
    skipTaskbar: false,
    backgroundColor: '#0c0c0f',
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#0c0c0f',
      symbolColor: '#8e8e96',
      height: 32
    },
    icon: path.join(__dirname, 'icons', 'appIcon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.setAlwaysOnTop(true, 'screen-saver', 1);
  win.setMenu(null);
  win.loadFile('app.html');

  // Opacity
  ipcMain.on('set-opacity', (_, val) => {
    if (win) win.setOpacity(val);
  });

  // Storage
  ipcMain.handle('load-state', () => {
    try { return fs.readFileSync(storagePath, 'utf-8'); } catch(e) { return null; }
  });
  ipcMain.handle('save-state', (_, data) => {
    try { fs.writeFileSync(storagePath, data, 'utf-8'); return true; } catch(e) { return false; }
  });

  // Clipboard image for OCR
  ipcMain.handle('get-clipboard-image', () => {
    const img = clipboard.readImage();
    if (img.isEmpty()) return null;
    return img.toPNG().toString('base64');
  });

  // Window controls
  ipcMain.on('win-minimize', () => { if (win) win.minimize(); });
  ipcMain.on('win-close', () => { if (win) win.close(); });

  // Open URL in browser
  ipcMain.on('open-url', (_, url) => {
    if (url.startsWith('http')) shell.openExternal(url);
  });

  // Auto-update: just open download link, no batch scripts
  ipcMain.on('open-update', (_, url) => {
    shell.openExternal(url);
  });
});

app.on('window-all-closed', () => app.quit());
