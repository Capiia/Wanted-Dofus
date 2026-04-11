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
    frame: false,
    resizable: true,
    skipTaskbar: false,
    backgroundColor: '#0c0c0f',
    autoHideMenuBar: true,
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

  // Auto-update: download app.asar and replace
  ipcMain.handle('download-update', async (_, url) => {
    const https = require('https');
    const appDir = path.dirname(app.getPath('exe'));
    const asarPath = path.join(appDir, 'resources', 'app.asar');
    const newPath = asarPath + '.new';
    const batPath = path.join(appDir, 'update.bat');

    return new Promise((resolve, reject) => {
      // Follow redirects (GitHub gives 302)
      const download = (downloadUrl) => {
        https.get(downloadUrl, { headers: { 'User-Agent': 'Wanted' } }, (res) => {
          if (res.statusCode === 302 || res.statusCode === 301) {
            download(res.headers.location);
            return;
          }
          if (res.statusCode !== 200) { reject('HTTP ' + res.statusCode); return; }

          const file = fs.createWriteStream(newPath);
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            // Create batch script to replace asar and restart
            const exePath = app.getPath('exe');
            const bat = `@echo off
ping 127.0.0.1 -n 3 >nul
del "${asarPath}.bak" 2>nul
ren "${asarPath}" "app.asar.bak"
ren "${newPath}" "app.asar"
start "" "${exePath}"
del "%~f0"`;
            fs.writeFileSync(batPath, bat);
            resolve(batPath);
          });
        }).on('error', reject);
      };
      download(url);
    });
  });

  ipcMain.on('run-update-and-quit', (_, batPath) => {
    require('child_process').exec(`start "" "${batPath}"`, () => {});
    setTimeout(() => app.quit(), 500);
  });
});

app.on('window-all-closed', () => app.quit());
