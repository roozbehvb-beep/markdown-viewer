const { app, BrowserWindow, ipcMain } = require('electron');
const { Menu } = require('electron');
Menu.setApplicationMenu(null);
const path = require('path');
const fs = require('fs');

const TEMP_FILE = path.join(path.dirname(app.getPath('exe')), 'autosave.md');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.loadFile('index.html');
}

// خواندن فایل temp هنگام شروع
ipcMain.handle('load-temp', () => {
  try {
    if (fs.existsSync(TEMP_FILE)) {
      return fs.readFileSync(TEMP_FILE, 'utf-8');
    }
    return '';
  } catch (e) { return ''; }
});

// ذخیره در فایل temp
ipcMain.handle('save-temp', (event, content) => {
  try {
    fs.writeFileSync(TEMP_FILE, content, 'utf-8');
    return true;
  } catch (e) { return false; }
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
