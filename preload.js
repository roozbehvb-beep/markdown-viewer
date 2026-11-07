const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadTemp: () => ipcRenderer.invoke('load-temp'),
  saveTemp: (content) => ipcRenderer.invoke('save-temp', content)
});